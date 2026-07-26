import { writeFileSync } from "node:fs";

const site = "https://avenna01-ceo.github.io/claude-code-survival-kr";
const gumroad = "https://gaiinmaster.gumroad.com/l/ai-automation-0won-escape-kit";
const paypal = "https://www.paypal.com/ncp/payment/L4XKCQNYXKZDE";
const video = `${site}/promo-assets/ai-automation-0won-short.mp4`;
const thumb = `${site}/promo-assets/thumbnail.png`;

const head = ({ title, description, canonical }) => `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${thumb}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${thumb}">
  <style>
    :root {
      color-scheme: light;
      --ink: #111827;
      --muted: #5f6f86;
      --line: #dbe4ef;
      --paper: #f7fafc;
      --card: #ffffff;
      --red: #dc2626;
      --green: #0f7a42;
      --blue: #1d4ed8;
      --yellow: #facc15;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, "Malgun Gothic", "Apple SD Gothic Neo", sans-serif;
      color: var(--ink);
      background: var(--paper);
      line-height: 1.56;
      word-break: keep-all;
    }
    a { color: inherit; }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 0 22px; }
    .top {
      position: sticky;
      top: 0;
      z-index: 10;
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,.94);
      backdrop-filter: blur(12px);
    }
    .nav {
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand { font-weight: 900; letter-spacing: 0; }
    .buy {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 0 14px;
      border-radius: 6px;
      background: var(--ink);
      color: #fff;
      text-decoration: none;
      font-weight: 900;
      white-space: nowrap;
    }
    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1.02fr) minmax(320px, .98fr);
      gap: 38px;
      padding: 50px 0 36px;
      align-items: center;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      padding: 7px 10px;
      border: 1px solid #fecaca;
      background: #fff5f5;
      border-radius: 999px;
      color: var(--red);
      font-weight: 900;
      font-size: 14px;
    }
    h1 {
      margin: 18px 0 16px;
      font-size: clamp(38px, 6.4vw, 72px);
      line-height: 1;
      letter-spacing: 0;
    }
    .lead {
      font-size: 20px;
      color: #334155;
      max-width: 720px;
      margin: 0 0 22px;
    }
    .cta-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .primary, .secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      padding: 0 19px;
      border-radius: 6px;
      font-weight: 900;
      text-decoration: none;
    }
    .primary { background: var(--red); color: #fff; box-shadow: 0 16px 30px rgba(220,38,38,.17); }
    .secondary { border: 1px solid var(--line); background: #fff; color: var(--ink); }
    .note { color: var(--muted); font-size: 14px; margin-top: 12px; }
    .dashboard {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 22px;
      box-shadow: 0 24px 70px rgba(15,23,42,.12);
    }
    .dash-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      border-bottom: 1px solid var(--line);
      padding-bottom: 16px;
      margin-bottom: 18px;
    }
    .dash-head strong { font-size: 15px; }
    .zero { font-size: 58px; line-height: 1; color: var(--red); font-weight: 950; margin: 10px 0 2px; }
    .metric {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 14px;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid var(--line);
    }
    .metric:last-child { border-bottom: 0; }
    .metric b { display: block; }
    .metric span { color: var(--muted); font-size: 14px; }
    .pill {
      padding: 7px 10px;
      border-radius: 999px;
      font-weight: 900;
      font-size: 13px;
      border: 1px solid;
      white-space: nowrap;
    }
    .bad { color: var(--red); background: #fef2f2; border-color: #fecaca; }
    .ok { color: var(--blue); background: #eff6ff; border-color: #bfdbfe; }
    .warn { color: #854d0e; background: #fefce8; border-color: #fde68a; }
    .band { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 42px 0; }
    .video-band { background: #111827; color: #fff; padding: 46px 0; }
    .video-wrap { display: grid; grid-template-columns: minmax(260px, 380px) 1fr; gap: 36px; align-items: center; }
    video { width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,.18); background: #020617; box-shadow: 0 24px 70px rgba(0,0,0,.28); }
    .video-copy h2, .section h2 { margin: 0 0 14px; font-size: 38px; line-height: 1.12; letter-spacing: 0; }
    .video-copy p { color: #cbd5e1; }
    .video-copy .primary, .price .primary { background: var(--yellow); color: #111827; box-shadow: none; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
    .item { background: var(--paper); border: 1px solid var(--line); border-radius: 8px; padding: 18px; min-height: 138px; }
    .item h3 { margin: 0 0 8px; font-size: 20px; }
    .item p { margin: 0; color: #475569; }
    .section { padding: 48px 0; }
    .split { display: grid; grid-template-columns: .9fr 1.1fr; gap: 34px; align-items: start; }
    .list { display: grid; gap: 12px; margin: 20px 0 0; }
    .row { background: #fff; border: 1px solid var(--line); border-radius: 8px; padding: 14px 16px; font-weight: 800; }
    .price { background: var(--ink); color: #fff; padding: 34px; border-radius: 8px; }
    .price .amount { font-size: 64px; font-weight: 950; line-height: 1; margin: 8px 0 14px; }
    .price p { color: #cbd5e1; }
    .price .primary { width: 100%; }
    .mini { font-size: 14px; color: var(--muted); }
    footer { color: var(--muted); padding: 34px 0 52px; font-size: 14px; }
    @media (max-width: 820px) {
      .hero, .split, .video-wrap { grid-template-columns: 1fr; }
      .grid { grid-template-columns: 1fr; }
      h1 { font-size: 42px; }
      .lead { font-size: 18px; }
      .zero { font-size: 48px; }
      .nav { align-items: flex-start; flex-direction: column; padding: 12px 0; }
      .buy { width: 100%; }
    }
  </style>
</head>
<body>`;

const foot = `  <footer class="wrap">
    수익 보장 없음. 맞춤 대행 없음. 구매자가 직접 실행하는 디지털 키트입니다.
  </footer>
</body>
</html>
`;

const landing = `${head({
  title: "AI 자동화 0원 탈출 키트 | 툴값만 나가고 입금은 0원일 때",
  description: "Claude Code 100/100%, Codex 주간 한도 대기, 오늘 입금 0원. AI 자동화 초보자가 $29로 첫 유료 제안을 검증하는 실행 키트.",
  canonical: `${site}/ai-automation-0won-escape-kit.html`,
})}
  <header class="top">
    <div class="wrap nav">
      <div class="brand">AI Automation 0 Won Escape Kit</div>
      <a class="buy" href="${gumroad}">US$29로 받기</a>
    </div>
  </header>

  <main>
    <section class="wrap hero">
      <div>
        <div class="eyebrow">툴값은 빠져나가는데 입금은 아직 0원</div>
        <h1>자동화는 켜져 있는데, 왜 내 계좌는 조용할까?</h1>
        <p class="lead">
          Claude Code는 100/100%, Codex는 주간 리셋 대기, 자동화 워크플로우는 계속 늘어나는데 결제 알림은 조용하다면
          문제는 자동화가 아니라 <strong>사람이 돈을 내는 제안 구조</strong>일 가능성이 큽니다.
        </p>
        <div class="cta-row">
          <a class="primary" href="${gumroad}">US$29로 실행 키트 받기</a>
          <a class="secondary" href="${paypal}">PayPal로 결제하기</a>
        </div>
        <div class="note">비싼 강의나 대행을 사기 전에, 먼저 시장 반응을 확인하는 저가 실행 키트입니다.</div>
      </div>

      <aside class="dashboard" aria-label="AI 자동화 통증 대시보드">
        <div class="dash-head">
          <strong>오늘의 자동화 대시보드</strong>
          <span class="pill bad">입금 없음</span>
        </div>
        <div>오늘 입금</div>
        <div class="zero">0원</div>
        <div class="metric">
          <div><b>Claude Code</b><span>5시간 한도</span></div>
          <div class="pill bad">100/100% · 4시간 후 자동 재설정</div>
        </div>
        <div class="metric">
          <div><b>Codex</b><span>1주 사용량</span></div>
          <div class="pill ok">0% · 8월 2일 리셋</div>
        </div>
        <div class="metric">
          <div><b>구독/툴 비용</b><span>AI, 자동화, 호스팅, 결제 도구</span></div>
          <div class="pill warn">계속 증가</div>
        </div>
        <div class="metric">
          <div><b>고객에게 보낸 명확한 제안</b><span>구매자가 바로 이해하는 상품 구조</span></div>
          <div class="pill bad">0건</div>
        </div>
      </aside>
    </section>

    <section class="video-band">
      <div class="wrap video-wrap">
        <video controls playsinline poster="promo-assets/thumbnail.png">
          <source src="promo-assets/ai-automation-0won-short.mp4" type="video/mp4">
        </video>
        <div class="video-copy">
          <h2>“어, 이거 내 얘긴데?”가 먼저 나오게 만들었습니다.</h2>
          <p>
            자동화로 돈을 벌고 싶은 초보자가 실제로 겪는 공포는 기술 부족이 아니라
            “이번 달도 툴값만 나가고 입금은 0원일지 모른다”는 압박입니다.
            이 키트는 더 배우기 전에 팔릴 제안부터 꺼내게 만듭니다.
          </p>
          <a class="primary" href="${gumroad}">지금 US$29로 받기</a>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="wrap grid">
        <div class="item">
          <h3>더 배우기 전에</h3>
          <p>강의, 툴, 자동화를 추가하기 전에 사람들이 실제로 돈 낼 문장인지 먼저 확인합니다.</p>
        </div>
        <div class="item">
          <h3>더 만들기 전에</h3>
          <p>완성품을 기다리지 않고 랜딩, 결제 링크, 첫 제안 문구를 바로 꺼냅니다.</p>
        </div>
        <div class="item">
          <h3>더 쓰기 전에</h3>
          <p>구독료를 더 태우기 전에 $29짜리 작은 검증으로 방향을 확인합니다.</p>
        </div>
      </div>
    </section>

    <section class="wrap section split" id="inside">
      <div>
        <h2>전자책 하나가 아니라, 첫 판매를 만들기 위한 구조입니다.</h2>
        <p>
          구매자당 맞춤 작업을 대신해 주는 고가 서비스가 아닙니다.
          그래서 반품 리스크를 줄이고, 초보자가 감당 가능한 가격으로 “팔리는 말”부터 테스트하게 설계했습니다.
        </p>
      </div>
      <div class="list">
        <div class="row">랜딩페이지 카피 구조</div>
        <div class="row">PayPal/Gumroad 결제 흐름</div>
        <div class="row">후킹 문구 30개</div>
        <div class="row">DM/이메일 문구 10개</div>
        <div class="row">가격 반박 대응 10개</div>
        <div class="row">수익화 검증 체크리스트</div>
      </div>
    </section>

    <section class="wrap section split">
      <div>
        <h2>AI 한도보다 먼저 막히는 건 보통 ‘제안’입니다.</h2>
        <p>
          코드를 더 돌리기 전에, 자동화를 더 붙이기 전에, 고객이 이해하고 결제할 수 있는 문장부터 필요합니다.
          이 키트는 “나중에 완벽해지면 팔겠다”를 끊고 오늘 보낼 수 있는 판매 흐름을 줍니다.
        </p>
        <p class="mini">수익을 보장하지 않습니다. 대신 더 큰 지출 전에 작은 검증을 하게 만듭니다.</p>
      </div>
      <div class="price">
        <div>Self-execution kit</div>
        <div class="amount">US$29</div>
        <p>한 번 더 비싼 툴을 결제하기 전에, 먼저 고객 반응을 확인하세요.</p>
        <a class="primary" href="${gumroad}">Gumroad에서 받기</a>
      </div>
    </section>
  </main>
${foot}`;

const root = `${head({
  title: "AI Automation 0 Won Escape Kit",
  description: "AI 툴 비용은 늘어나는데 오늘 입금은 0원인 사람을 위한 첫 유료 제안 검증 키트.",
  canonical: `${site}/`,
})}
  <main class="wrap hero">
    <div>
      <div class="eyebrow">AI 자동화 수익화 검증 키트</div>
      <h1>툴값보다 먼저 결제 링크를 검증하세요.</h1>
      <p class="lead">AI 자동화로 수익을 만들고 싶지만 오늘 입금이 0원이라면, 더 만들기 전에 팔릴 제안부터 확인해야 합니다.</p>
      <div class="cta-row">
        <a class="primary" href="./ai-automation-0won-escape-kit.html">판매 페이지 보기</a>
        <a class="secondary" href="${gumroad}">US$29로 받기</a>
      </div>
    </div>
    <aside class="dashboard">
      <div class="dash-head"><strong>현재 병목</strong><span class="pill bad">제안 없음</span></div>
      <div class="metric"><div><b>오늘 입금</b><span>수익화 목표와 현실의 간격</span></div><div class="pill bad">0원</div></div>
      <div class="metric"><div><b>AI 툴 비용</b><span>Claude Code, Codex, 자동화 도구</span></div><div class="pill warn">증가</div></div>
      <div class="metric"><div><b>결제 가능한 제안</b><span>고객이 바로 이해하는 문장</span></div><div class="pill bad">부족</div></div>
    </aside>
  </main>
${foot}`;

function articlePage({ file, title, description, h1, lead, rows }) {
  return `${head({ title, description, canonical: `${site}/${file}` })}
  <header class="top"><div class="wrap nav"><div class="brand">AI Automation 0 Won Escape Kit</div><a class="buy" href="${gumroad}">US$29로 받기</a></div></header>
  <main>
    <section class="wrap hero">
      <div>
        <div class="eyebrow">AI 자동화 초보자용 실전 점검</div>
        <h1>${h1}</h1>
        <p class="lead">${lead}</p>
        <div class="cta-row"><a class="primary" href="${gumroad}">키트 받기</a><a class="secondary" href="./ai-automation-0won-escape-kit.html">랜딩 보기</a></div>
      </div>
      <aside class="dashboard">
        <div class="dash-head"><strong>오늘의 신호</strong><span class="pill bad">결제 전환 낮음</span></div>
        ${rows.map((row) => `<div class="metric"><div><b>${row[0]}</b><span>${row[1]}</span></div><div class="pill ${row[3]}">${row[2]}</div></div>`).join("\n        ")}
      </aside>
    </section>
    <section class="band"><div class="wrap grid">
      <div class="item"><h3>증상</h3><p>자동화는 늘었는데 고객에게 보낸 제안은 없거나, 너무 어렵고 비싸 보입니다.</p></div>
      <div class="item"><h3>원인</h3><p>구매자가 얻는 결과보다 만든 도구 설명이 앞서면 초보자 시장에서는 바로 이탈합니다.</p></div>
      <div class="item"><h3>처방</h3><p>작은 가격, 명확한 결과, 바로 실행할 수 있는 결제 흐름으로 먼저 검증합니다.</p></div>
    </div></section>
    <section class="wrap section split"><div><h2>더 큰 자동화 전에 작은 결제 검증부터</h2><p>이 키트는 완성된 대행 상품이 아니라, 지금 가진 AI 도구로 첫 유료 제안을 꺼내는 구조입니다. 실패해도 손실이 작고, 반응이 오면 다음 고가 서비스로 확장할 수 있습니다.</p></div><div class="price"><div>Validation kit</div><div class="amount">US$29</div><p>구독료를 한 번 더 결제하기 전에 고객 반응을 확인하세요.</p><a class="primary" href="${gumroad}">Gumroad에서 받기</a></div></section>
  </main>
${foot}`;
}

const pages = new Map([
  ["ai-automation-0won-escape-kit.html", landing],
  ["index.html", root],
  ["ai-tool-subscription-zero-revenue.html", articlePage({
    file: "ai-tool-subscription-zero-revenue.html",
    title: "AI 툴 구독료는 나가는데 수익은 0원일 때",
    description: "AI 자동화 초보자가 툴 구독료 지출 전에 먼저 확인해야 할 유료 제안 검증 흐름.",
    h1: "AI 툴값은 자동 결제되는데, 왜 수익은 자동화되지 않을까?",
    lead: "문제는 도구 수가 아닐 수 있습니다. 고객이 바로 이해하고 돈 낼 수 있는 제안이 없는 상태에서 자동화만 늘리면 지출 자동화가 먼저 완성됩니다.",
    rows: [["오늘 입금", "구독료보다 먼저 봐야 할 숫자", "0원", "bad"], ["툴 구독", "AI, 자동화, 호스팅", "증가", "warn"], ["검증된 제안", "돈을 낼 이유가 보이는 문장", "부족", "bad"]],
  })],
  ["claude-code-limit-100-100.html", articlePage({
    file: "claude-code-limit-100-100.html",
    title: "Claude Code 100/100% 한도인데 오늘 입금 0원이라면",
    description: "Claude Code 한도와 Codex 리셋을 기다리는 초보자가 먼저 점검해야 할 AI 자동화 수익화 병목.",
    h1: "Claude Code 100/100%보다 무서운 건 결제 알림 0건입니다.",
    lead: "5시간 한도는 다시 돌아옵니다. 하지만 고객이 이해하는 제안이 없으면 리셋 후에도 같은 자동화만 반복하게 됩니다.",
    rows: [["Claude Code", "5시간 사용 한도", "100/100%", "bad"], ["다음 재설정", "작업은 다시 가능해짐", "4시간 후", "ok"], ["오늘 입금", "가장 차가운 현실 지표", "0원", "bad"]],
  })],
]);

for (const [file, content] of pages) {
  writeFileSync(file, content, "utf8");
}

writeFileSync("robots.txt", `User-agent: *
Allow: /
Sitemap: ${site}/sitemap.xml
`, "utf8");

writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site}/</loc><lastmod>2026-07-26</lastmod><priority>1.0</priority></url>
  <url><loc>${site}/ai-automation-0won-escape-kit.html</loc><lastmod>2026-07-26</lastmod><priority>1.0</priority></url>
  <url><loc>${site}/ai-tool-subscription-zero-revenue.html</loc><lastmod>2026-07-26</lastmod><priority>0.8</priority></url>
  <url><loc>${site}/claude-code-limit-100-100.html</loc><lastmod>2026-07-26</lastmod><priority>0.8</priority></url>
</urlset>
`, "utf8");

writeFileSync("share-posts.md", `# Share Posts

## YouTube Shorts / TikTok caption
AI 자동화로 돈 벌려고 시작했는데 오늘 입금 0원, Claude Code 100/100%, Codex 리셋 대기만 보고 있다면 문제는 자동화가 아니라 제안일 수 있습니다.

더 비싼 툴 결제하기 전에 $29로 첫 유료 제안부터 검증하세요.
${site}/ai-automation-0won-escape-kit.html

#AI자동화 #수익화 #ClaudeCode #Codex #자동화

## DEV / Product Hunt short intro
I built a low-ticket Korean validation kit for beginners who are spending on AI automation tools but still have zero revenue. It focuses on the offer, landing copy, payment flow, and first outreach messages before buying another subscription.

Landing: ${site}/ai-automation-0won-escape-kit.html
Gumroad: ${gumroad}

## Korean community post
AI 자동화로 수익을 만들려고 하다가 툴 구독료만 늘고 입금은 0원인 분들을 위한 저가 실행 키트를 만들었습니다.

고가 대행이나 강의가 아니라, 먼저 팔릴 제안을 검증하는 구성입니다. 랜딩 카피, 결제 흐름, 후킹 문구, DM/이메일 문구, 반박 대응, 체크리스트가 들어 있습니다.

가격은 US$29로 낮췄습니다. 비싼 툴을 한 번 더 결제하기 전에 작은 검증부터 하자는 방향입니다.

${site}/ai-automation-0won-escape-kit.html
`, "utf8");

