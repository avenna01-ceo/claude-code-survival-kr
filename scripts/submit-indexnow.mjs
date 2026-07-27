import { readFileSync } from "node:fs";

const urls = JSON.parse(readFileSync("indexnow-urls.json", "utf8"));
const body = {
  host: "avenna01-ceo.github.io",
  key: "6f1b8f8230ef4e7e9aa72e9b69b2a0db",
  keyLocation: "https://avenna01-ceo.github.io/claude-code-survival-kr/6f1b8f8230ef4e7e9aa72e9b69b2a0db.txt",
  urlList: urls,
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(JSON.stringify({
  status: response.status,
  statusText: response.statusText,
  submitted: urls.length,
  text: await response.text(),
}, null, 2));
