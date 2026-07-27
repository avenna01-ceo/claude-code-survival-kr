import { readFileSync, writeFileSync } from "node:fs";

const path = "README.md";
const marker = "## Build your first paid AI automation offer in 30 minutes";
let body = readFileSync(path, "utf8");

body = body.replace(/## AI automations running, but revenue still 0\?[\s\S]*?\n---\n\n/, "");

if (!body.includes(marker)) {
  const insert = `${marker}

If Claude Code, Codex, and automation tools are active but today's deposit is still 0, do not add another workflow first. Create a small paid offer and test whether anyone will pay.

Start with the 30-minute offer page:
https://avenna01-ceo.github.io/claude-code-survival-kr/ai-automation-first-paid-offer-30min.html

Free diagnosis:
https://avenna01-ceo.github.io/claude-code-survival-kr/ai-revenue-diagnosis.html

Break-even calculator:
https://avenna01-ceo.github.io/claude-code-survival-kr/ai-tool-cost-calculator.html

US$9 execution kit:
https://gaiinmaster.gumroad.com/l/ai-automation-0won-escape-kit

---

`;
  const lines = body.split(/\r?\n/);
  body = [lines[0], insert.trimEnd(), ...lines.slice(1)].join("\n");
  writeFileSync(path, body, "utf8");
}
