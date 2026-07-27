# n8n Creator Hub Submission Draft

## Template title

Free AI Lead Capture and Score Workflow

## Short description

Score inbound AI automation leads before sending a paid offer, so builders stop chasing low-intent buyers while tool subscriptions keep charging.

## Who is this for?

This workflow is for AI automation freelancers, template sellers, and early-stage builders who have landing pages or inquiry forms but still do not know which leads are ready for a paid offer.

## What problem does it solve?

Many beginners build automations before they validate buying intent. They collect messages, DMs, and form replies, but every lead looks the same. This workflow creates a simple first-sale filter: pain, budget, urgency, and source.

## What this workflow does

- Receives an inbound lead through an n8n webhook.
- Normalizes source, pain, budget, and urgency fields.
- Scores the lead using a simple JavaScript node.
- Segments the lead into hot, warm, or cold.
- Sends hot leads to the paid-offer path.
- Sends warm/cold leads to a proof or qualification path.

## Setup

1. Import `free-workflows/n8n-ai-lead-capture-and-score.json`.
2. Connect the webhook URL to a form, landing page, or opted-in inquiry source.
3. Replace the example offer URL with your own checkout or offer page.
4. Replace the proof URL with your own case study, demo, or free resource.
5. Test with a sample lead containing `pain`, `budget`, `urgency`, and `source`.

## Sample test payload

```json
{
  "source": "landing_page",
  "pain": "AI automation is running but revenue is still 0 and tool costs keep charging",
  "budget": 9,
  "urgency": "today"
}
```

## Customization ideas

- Change the scoring thresholds for your market.
- Add a CRM node after the scoring step.
- Send hot leads to Gmail, Slack, Discord, Telegram, or a Google Sheet.
- Add human approval before any outbound message.

## Ethical use note

This workflow is for opted-in leads only. It is not designed for scraping, spam, fake scarcity, or automated cold outreach without consent.

## Public free workflow page

https://avenna01-ceo.github.io/claude-code-survival-kr/free-n8n-ai-lead-capture-workflow.html

## Direct JSON

https://avenna01-ceo.github.io/claude-code-survival-kr/free-workflows/n8n-ai-lead-capture-and-score.json
