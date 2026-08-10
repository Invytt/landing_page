// One-off: render emails/*.html with sample data and send via AutoSend raw-HTML.
import { readFile } from "node:fs/promises"
import { config } from "dotenv"

config({ path: ".env", override: true })

// Recipient: first CLI arg, else TEST_EMAIL_TO, else the default inbox.
// These are real sends — there is no AutoSend sandbox mode.
const TO = process.argv[2] || process.env.TEST_EMAIL_TO || "siddhantg2002@gmail.com"
const API = "https://api.autosend.com/v1/mails/send"
const key = process.env.AUTOSEND_API_KEY
const projectId = process.env.AUTOSEND_PROJECT_ID
const from = { email: process.env.EMAIL_FROM || "events@invytt.com", name: "Invytt" }
if (!key) {
  console.error("Missing AUTOSEND_API_KEY")
  process.exit(1)
}

const jobs = [
  {
    file: "emails/otp.html",
    subject: "Your Invytt verification code",
    data: { otp: "482915" },
  },
  {
    file: "emails/welcom.html",
    subject: "Welcome to Invytt",
    data: { daysLeft: "21", launchDate: "July 15, 2026" },
  },
]

const render = (html, data) =>
  html.replace(/\{\{([a-zA-Z_]+)\}\}/g, (_, k) => data[k] ?? "")

const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }
if (projectId) headers["x-project-id"] = projectId

for (const job of jobs) {
  let raw
  try {
    raw = await readFile(job.file, "utf8")
  } catch {
    console.log(`– skipped ${job.file} (not found)`)
    continue
  }
  const html = render(raw, job.data)
  const res = await fetch(API, {
    method: "POST",
    headers,
    body: JSON.stringify({ from, to: { email: TO }, subject: job.subject, html }),
  })
  const text = await res.text().catch(() => "")
  console.log(`${res.ok ? "✓ sent" : "✗ FAILED"} ${job.file} → ${res.status} ${res.ok ? "" : text}`)
}
console.log("done.")
