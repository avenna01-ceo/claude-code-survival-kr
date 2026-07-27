import { writeFileSync } from "node:fs";

const site = "https://avenna01-ceo.github.io/claude-code-survival-kr";
const gumroad = "https://gaiinmaster.gumroad.com/l/ai-automation-0won-escape-kit";
const diagnosis = `${site}/ai-revenue-diagnosis.html`;
const calculator = `${site}/ai-tool-cost-calculator.html`;
const thumb = `${site}/promo-assets/thumbnail.png`;

const pages = [
  {
    file: "claude-code-100-100-revenue-zero.html",
    title: "Claude Code 100/100%인데 오늘 입금 0원이라면",
    desc: "Claude Code 사용 한도는 꽉 찼는데 수익이 0원인 사람이 먼저 확인해야 할 AI 자동화 수익화 병목.",
    h1: "Claude Code 100/100%보다 먼저 봐야 할 숫자는 오늘 입금 0원입니다.",
    pain: "한도는 다시 돌아오지만, 고객이 이해하는 제안이 없으면 다음 5시간도 같은 자동화만 반복됩니다.",
    kw: "Claude Code 100/100, AI 자동화 수익, 오늘 입금 0원",
  },
  {
    file: "codex-weekly-limit-zero-revenue.html",
    title: "Codex 주간 한도 대기 중인데 수익은 0원일 때",
    desc: "Codex 사용량과 리셋 날짜를 기다리는 동안 먼저 고쳐야 할 제안 구조 체크.",
    h1: "Codex 리셋을 기다리는 동안 팔 제안은 만들어졌나요?",
    pain: "도구 한도는 시간이 해결하지만, 흐릿한 상품 제안은 시간이 해결하지 않습니다.",
    kw: "Codex 사용 한도, Codex 리셋, AI 수익화",
  },
  {
    file: "ai-tool-subscription-cost-zero-income.html",
    title: "AI 툴 구독료는 나가는데 수익은 0원일 때",
    desc: "AI 툴 비용이 늘어나는 초보자가 더 결제하기 전에 확인해야 할 손익분기와 제안 검증.",
    h1: "지금 완성된 건 수익 자동화가 아니라 지출 자동화일 수 있습니다.",
    pain: "매달 빠져나가는 구독료보다 먼저 필요한 건 고객이 결제할 명확한 이유입니다.",
    kw: "AI 툴 구독료, AI 자동화 비용, 수익 0원",
  },
  {
    file: "ai-automation-beginner-offer-test.html",
    title: "AI 자동화 초보자를 위한 첫 유료 제안 테스트",
    desc: "초보자가 고가 서비스 전에 낮은 가격으로 시장 반응을 확인하는 AI 자동화 제안 테스트.",
    h1: "초보자는 고가 자동화보다 작은 유료 제안부터 검증해야 합니다.",
    pain: "처음부터 비싸게 팔면 불신과 반품 리스크가 커집니다. 먼저 작은 가격으로 반응을 봐야 합니다.",
    kw: "AI 자동화 초보자, 첫 유료 상품, 제안 테스트",
  },
  {
    file: "gumroad-paypal-ai-offer-test.html",
    title: "Gumroad와 PayPal로 AI 자동화 제안 검증하기",
    desc: "복잡한 쇼핑몰을 만들기 전에 Gumroad와 PayPal 링크로 유료 제안을 빠르게 검증하는 방법.",
    h1: "쇼핑몰보다 먼저 결제 링크 하나로 제안을 검증하세요.",
    pain: "결제 시스템을 크게 만들기 전에, 사람들이 실제로 결제 버튼을 누르는지 확인해야 합니다.",
    kw: "Gumroad PayPal, AI 상품 판매, 결제 링크 검증",
  },
  {
    file: "ai-automation-revenue-diagnosis-checklist.html",
    title: "AI 자동화 수익화 진단 체크리스트",
    desc: "AI 자동화가 돌아가는데 매출이 없는 사람이 확인할 5가지 제안 병목 체크리스트.",
    h1: "자동화가 돌아가는데 매출이 없다면 이 5가지를 먼저 체크하세요.",
    pain: "문제는 기술 부족이 아니라 고객이 돈을 낼 이유가 보이지 않는 구조일 수 있습니다.",
    kw: "AI 자동화 체크리스트, 수익화 진단, 제안 병목",
  },
];

function head({ title, desc, file }) {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${site}/${file}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${site}/${file}">
  <meta property="og:image" content="${thumb}">
  <style>
    * { box-sizing: border-box; }
    body { margin:0; font-family: Arial, "Malgun Gothic", "Apple SD Gothic Neo", sans-serif; color:#111827; background:#f8fafc; line-height:1.58; word-break:keep-all; }
    .wrap { max-width: 980px; margin: 0 auto; padding: 0 22px; }
    header { background:#fff; border-bottom:1px solid #dbe4ef; }
    .nav { min-height:64px; display:flex; align-items:center; justify-content:space-between; gap:14px; }
    .brand { font-weight:900; }
    .btn { display:inline-flex; min-height:44px; align-items:center; justify-content:center; padding:0 15px; border-radius:6px; background:#111827; color:#fff; text-decoration:none; font-weight:900; white-space:nowrap; }
    main { padding:44px 0 58px; }
    .eyebrow { display:inline-flex; padding:7px 10px; border-radius:999px; border:1px solid #fecaca; background:#fff5f5; color:#dc2626; font-size:14px; font-weight:900; }
    h1 { margin:18px 0 14px; font-size:clamp(38px,6vw,64px); line-height:1; letter-spacing:0; }
    .lead { font-size:20px; color:#334155; margin:0 0 20px; }
    .panel { background:#fff; border:1px solid #dbe4ef; border-radius:8px; padding:22px; margin:24px 0; }
    .grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:22px; }
    .card { background:#fff; border:1px solid #dbe4ef; border-radius:8px; padding:16px; }
    .card b { display:block; margin-bottom:6px; }
    .actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
    .red { background:#dc2626; }
    .yellow { background:#facc15; color:#111827; }
    @media (max-width:780px){ .nav{flex-direction:column;align-items:flex-start;padding:12px 0}.btn{width:100%}.grid{grid-template-columns:1fr} }
  </style>
</head>
<body>`;
}

function page(p) {
  return `${head(p)}
  <header><div class="wrap nav"><div class="brand">AI Revenue Diagnosis</div><a class="btn" href="${diagnosis}?utm_source=seo_page&utm_medium=top&utm_campaign=72h">무료 진단</a></div></header>
  <main class="wrap">
    <div class="eyebrow">${p.kw}</div>
    <h1>${p.h1}</h1>
    <p class="lead">${p.pain}</p>
    <div class="actions">
      <a class="btn red" href="${diagnosis}?utm_source=${p.file}&utm_medium=cta&utm_campaign=72h">60초 무료 진단하기</a>
      <a class="btn" href="${calculator}?utm_source=${p.file}&utm_medium=cta&utm_campaign=72h">툴값 손익분기 계산</a>
      <a class="btn yellow" href="${gumroad}?utm_source=${p.file}&utm_medium=cta&utm_campaign=72h">US$9 키트 보기</a>
    </div>
    <section class="panel">
      <h2>성과가 안 나는 핵심 원인</h2>
      <p>AI 자동화 초보자는 보통 기능을 더 만들면 수익이 따라올 거라고 생각합니다. 하지만 구매자는 기능보다 자기 문제, 결과, 가격을 먼저 봅니다. 이 셋이 30초 안에 이해되지 않으면 유입이 와도 결제로 이어지기 어렵습니다.</p>
    </section>
    <section class="grid">
      <div class="card"><b>1. 문제 문장</b>고객이 “내 얘기다”라고 느끼는 고통이 앞에 있어야 합니다.</div>
      <div class="card"><b>2. 작은 가격</b>처음부터 고가로 팔면 신뢰 장벽이 커집니다.</div>
      <div class="card"><b>3. 결제 흐름</b>설명보다 먼저 테스트 가능한 결제 링크가 필요합니다.</div>
    </section>
  </main>
</body>
</html>`;
}

for (const p of pages) writeFileSync(p.file, page(p), "utf8");

writeFileSync("traffic-index.html", `${head({
  title: "AI 자동화 수익화 문제별 진단 페이지",
  desc: "Claude Code, Codex, AI 툴 구독료, 오늘 입금 0원 문제를 나눠 진단하는 유입 허브.",
  file: "traffic-index.html",
})}
  <header><div class="wrap nav"><div class="brand">AI Revenue Traffic Hub</div><a class="btn" href="${diagnosis}?utm_source=traffic_hub&utm_medium=top&utm_campaign=72h">무료 진단</a></div></header>
  <main class="wrap">
    <div class="eyebrow">문제별 진입 페이지</div>
    <h1>검색하는 말은 다릅니다. 하지만 병목은 대부분 제안입니다.</h1>
    <p class="lead">사용자가 실제로 검색할 만한 문제 문장별로 진입점을 나눴습니다.</p>
    <section class="grid">
      ${pages.map((p) => `<a class="card" href="./${p.file}"><b>${p.title}</b>${p.desc}</a>`).join("\n      ")}
    </section>
  </main>
</body>
</html>`, "utf8");

const urls = [
  "",
  "ai-revenue-diagnosis.html",
  "ai-tool-cost-calculator.html",
  "ai-automation-0won-escape-kit.html",
  "traffic-index.html",
  ...pages.map((p) => p.file),
];

writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site}/${u}</loc><lastmod>2026-07-27</lastmod><priority>${u ? "0.8" : "1.0"}</priority></url>`).join("\n")}
</urlset>
`, "utf8");

writeFileSync("indexnow-urls.json", JSON.stringify(urls.map((u) => `${site}/${u}`), null, 2), "utf8");
