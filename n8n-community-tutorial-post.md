# Title

Free n8n lead scoring workflow for AI automation builders stuck at zero revenue

# Category

Tutorials

# Body

I made a small n8n workflow for builders who are selling AI automation services, templates, or small first-sale offers.

It is not a scraping workflow and it does not send cold outreach.

The goal is narrower:

Before you pitch a paid offer, score whether the inbound lead has enough pain, budget, and urgency.

## What the workflow does

- Receives an opted-in lead through a webhook
- Normalizes `source`, `pain`, `budget`, and `urgency`
- Scores the lead with a Code node
- Segments the lead into `hot`, `warm`, or `cold`
- Routes hot leads toward a paid-offer path
- Routes warm/cold leads toward proof or one qualifying question

## Why I built it

I kept seeing the same failure pattern:

- automation is running
- AI tools are active
- dashboards look busy
- tool subscriptions keep charging
- revenue is still zero

In that situation, adding more workflows can hide the real issue.

Sometimes the first bottleneck is simply that every lead looks equal, so the seller pitches weak leads and misses the few people who actually have urgent pain.

## Free workflow

Landing page:
https://avenna01-ceo.github.io/claude-code-survival-kr/free-n8n-ai-lead-capture-workflow.html

Standalone Gist:
https://gist.github.com/avenna01-ceo/0fab852c3ede3609778dc0631bc04ca9

Direct JSON:
https://avenna01-ceo.github.io/claude-code-survival-kr/free-workflows/n8n-ai-lead-capture-and-score.json

## Sample payload

```json
{
  "source": "landing_page",
  "pain": "AI automation is running but revenue is still 0 and tool costs keep charging",
  "budget": 9,
  "urgency": "today"
}
```

## Ethical note

Please use this only for opted-in leads or inquiry forms. It is not meant for spam, scraping, or automated cold outreach.

Feedback on the workflow structure is welcome.
