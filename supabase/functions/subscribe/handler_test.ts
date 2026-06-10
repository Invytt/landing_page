// Deno test: `deno test supabase/functions/subscribe/handler_test.ts`
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { handleSubscribe, type Db, type Mailer } from "./handler.ts";

const post = (body: unknown) =>
  new Request("http://x/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const emptyDb: Db = {
  findByEmail: () => Promise.resolve(null),
  insert: () => Promise.resolve({}),
};

Deno.test("OPTIONS returns CORS ok", async () => {
  const res = await handleSubscribe(
    new Request("http://x", { method: "OPTIONS" }),
    emptyDb,
  );
  assertEquals(res.status, 200);
});

Deno.test("non-POST is rejected", async () => {
  const res = await handleSubscribe(
    new Request("http://x", { method: "GET" }),
    emptyDb,
  );
  assertEquals(res.status, 405);
});

Deno.test("missing email -> 400", async () => {
  const res = await handleSubscribe(post({}), emptyDb);
  assertEquals(res.status, 400);
});

Deno.test("bad email format -> 400", async () => {
  const res = await handleSubscribe(post({ email: "nope" }), emptyDb);
  assertEquals(res.status, 400);
});

Deno.test("new email inserts -> 201", async () => {
  let inserted = "";
  const db: Db = {
    findByEmail: () => Promise.resolve(null),
    insert: (e) => {
      inserted = e;
      return Promise.resolve({});
    },
  };
  const res = await handleSubscribe(post({ email: "New@Example.com " }), db);
  assertEquals(res.status, 201);
  assertEquals(inserted, "new@example.com"); // normalised
  assertEquals((await res.json()).success, true);
});

Deno.test("existing email -> 409 duplicate", async () => {
  const db: Db = {
    findByEmail: () => Promise.resolve({ id: "1" }),
    insert: () => Promise.resolve({}),
  };
  const res = await handleSubscribe(post({ email: "a@b.com" }), db);
  assertEquals(res.status, 409);
  assertEquals((await res.json()).alreadyExists, true);
});

Deno.test("unique-violation race -> 409", async () => {
  const db: Db = {
    findByEmail: () => Promise.resolve(null),
    insert: () => Promise.resolve({ error: { code: "23505" } }),
  };
  const res = await handleSubscribe(post({ email: "a@b.com" }), db);
  assertEquals(res.status, 409);
});

Deno.test("lookup throws -> 500", async () => {
  const db: Db = {
    findByEmail: () => Promise.reject(new Error("db down")),
    insert: () => Promise.resolve({}),
  };
  const res = await handleSubscribe(post({ email: "a@b.com" }), db);
  assertEquals(res.status, 500);
});

Deno.test("new signup -> welcome email sent once with normalised email", async () => {
  const db: Db = {
    findByEmail: () => Promise.resolve(null),
    insert: () => Promise.resolve({}),
  };
  const sent: string[] = [];
  const mailer: Mailer = {
    sendWelcome: (e) => {
      sent.push(e);
      return Promise.resolve();
    },
  };
  const res = await handleSubscribe(post({ email: "New@Example.com " }), db, mailer);
  assertEquals(res.status, 201);
  assertEquals(sent, ["new@example.com"]);
});

Deno.test("duplicate -> no welcome email", async () => {
  const db: Db = {
    findByEmail: () => Promise.resolve({ id: "1" }),
    insert: () => Promise.resolve({}),
  };
  let called = false;
  const mailer: Mailer = {
    sendWelcome: () => {
      called = true;
      return Promise.resolve();
    },
  };
  const res = await handleSubscribe(post({ email: "a@b.com" }), db, mailer);
  assertEquals(res.status, 409);
  assertEquals(called, false);
});

Deno.test("email failure does not break signup -> still 201", async () => {
  const db: Db = {
    findByEmail: () => Promise.resolve(null),
    insert: () => Promise.resolve({}),
  };
  const mailer: Mailer = {
    sendWelcome: () => Promise.reject(new Error("autosend down")),
  };
  const res = await handleSubscribe(post({ email: "a@b.com" }), db, mailer);
  assertEquals(res.status, 201);
  assertEquals((await res.json()).success, true);
});
