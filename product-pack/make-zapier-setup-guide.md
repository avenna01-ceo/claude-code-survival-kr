# Make/Zapier Setup Guide

Use this when you do not run n8n.

## Workflow 1: Lead capture and score

Trigger:

- New form submission
- New Gumroad sale inquiry
- New email with a selected label

Steps:

1. Store the lead in Google Sheets or Airtable.
2. Ask AI to classify the lead as `hot`, `warm`, or `cold`.
3. Add a pain tag: `tool_cost`, `no_sales`, `needs_setup`, `agency_candidate`.
4. Send yourself a notification only for `hot` or `warm`.

## Workflow 2: Inquiry to paid offer reply

Trigger:

- New inquiry, DM, or email.

Steps:

1. Summarize the inquiry in one sentence.
2. Match it to one paid offer angle.
3. Draft a reply with one useful tip and one link.
4. Keep human approval before sending.

## Workflow 3: Three-day follow-up

Trigger:

- Lead captured but no purchase.

Steps:

1. Day 0: send useful answer and direct offer link.
2. Day 1: send one concrete example.
3. Day 3: send final low-pressure close.

## Workflow 4: Objection router

Trigger:

- Reply contains hesitation.

Steps:

1. Classify objection: price, trust, time, setup, relevance.
2. Pull the matching reply from `objection-reply-bank.md`.
3. Draft reply for review.

## Workflow 5: Daily sales signal digest

Trigger:

- Every morning.

Steps:

1. Count views, clicks, replies, sales, and objections.
2. Mark each channel as keep, change, or kill.
3. Pick one action for the next 24 hours.
