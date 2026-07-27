import { readFileSync, writeFileSync } from "node:fs";

const path = "README.md";
const marker = "## AI automations running, but revenue still 0?";
const body = readFileSync(path, "utf8");

if (!body.includes(marker)) {
  const insert = `
${marker}

If Claude Code, Codex, and automation tools are active but today's deposit is still 0, the next bottleneck may be the offer, not the tool stack.

Start with the free diagnosis:
https://avenna01-ceo.github.io/claude-code-survival-kr/ai-revenue-diagnosis.html

Traffic hub:
https://avenna01-ceo.github.io/claude-code-survival-kr/traffic-index.html

Break-even calculator:
https://avenna01-ceo.github.io/claude-code-survival-kr/ai-tool-cost-calculator.html

US$9 execution kit:
https://gaiinmaster.gumroad.com/l/ai-automation-0won-escape-kit

---

`;
  const lines = body.split(/\r?\n/);
  const output = [lines[0], insert.trimEnd(), ...lines.slice(1)].join("\n");
  writeFileSync(path, output, "utf8");
}
