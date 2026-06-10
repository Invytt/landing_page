-- Waitlist email outbox: the waitlist_signups table doubles as a durable queue.
-- A scheduled worker drains rows where email_sent_at IS NULL.

-- 1. Track which signups have had their welcome email sent.
alter table public.waitlist_signups
  add column if not exists email_sent_at timestamptz;

-- 2. Backfill: mark all EXISTING rows as already sent so the worker only
--    emails signups created from now on (avoids blasting the current list).
update public.waitlist_signups
set email_sent_at = now()
where email_sent_at is null;

-- 3. Partial index for fast "unsent" lookups.
create index if not exists waitlist_signups_unsent_idx
  on public.waitlist_signups (created_at)
  where email_sent_at is null;

-- 4. Atomically claim a batch of unsent signups. FOR UPDATE SKIP LOCKED makes
--    this safe under concurrent workers (each claims a disjoint set, no
--    double-send). Marks them sent optimistically; release_waitlist_batch
--    rolls back the ones whose send failed.
create or replace function public.claim_waitlist_batch(batch_size int)
returns table (id int, email text)
language sql
as $$
  update public.waitlist_signups w
  set email_sent_at = now()
  where w.id in (
    select s.id
    from public.waitlist_signups s
    where s.email_sent_at is null
    order by s.created_at
    limit batch_size
    for update skip locked
  )
  returning w.id, w.email;
$$;

-- 5. Release a failed batch back to unsent so the next tick retries it.
create or replace function public.release_waitlist_batch(ids int[])
returns void
language sql
as $$
  update public.waitlist_signups
  set email_sent_at = null
  where id = any(ids);
$$;
