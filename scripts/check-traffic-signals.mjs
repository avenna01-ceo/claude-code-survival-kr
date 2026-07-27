import { readFileSync, writeFileSync } from "node:fs";

const experiments = JSON.parse(readFileSync("traffic-experiments.json", "utf8"));

async function head(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return { ok: res.ok, status: res.status, finalUrl: res.url };
  } catch (error) {
    return { ok: false, status: 0, error: error.message };
  }
}

async function text(url) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } catch (error) {
    return { ok: false, status: 0, body: "", error: error.message };
  }
}

const checks = [];
for (const exp of experiments) {
  const result = await head(exp.url);
  checks.push({ id: exp.id, channel: exp.channel, url: exp.url, ...result });
}

const devChecks = [];
for (const exp of experiments.filter((e) => e.channel === "DEV")) {
  const result = await text(exp.url);
  const body = result.body;
  const reactions = body.match(/reactions_count["']?\s*[:=]\s*(\d+)/i)?.[1] ?? null;
  const comments = body.match(/comments_count["']?\s*[:=]\s*(\d+)/i)?.[1] ?? null;
  devChecks.push({
    id: exp.id,
    status: result.status,
    titlePresent: body.includes("<title>"),
    diagnosisLinkPresent: body.includes("ai-revenue-diagnosis.html"),
    gumroadLinkPresent: body.includes("gaiinmaster.gumroad.com"),
    reactions,
    comments,
  });
}

const snapshot = {
  checkedAt: new Date().toISOString(),
  checks,
  devChecks,
};

writeFileSync("traffic-snapshot.json", JSON.stringify(snapshot, null, 2), "utf8");
console.log(JSON.stringify(snapshot, null, 2));
