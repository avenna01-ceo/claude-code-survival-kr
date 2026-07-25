# Stop Your AI From Breaking Working Code

> Rules and prompts that keep Claude Code, Cursor, and Codex from wrecking things that already worked.
> Everything here is copy-paste. Explanations kept to a minimum.

**[한국어 →](README.ko.md)**

The first two weeks feel like magic. Then the codebase grows past what the model
can hold at once, and it starts **fixing A while breaking B.**

That isn't a skill problem. It's a structure problem — which means prompting
harder won't fix it. Constraints will.

---

## The one thing to do tonight

Create `CLAUDE.md` in your project root and paste this.
Claude Code reads it automatically at the start of every conversation.

*(Cursor → `.cursorrules`, Codex/Copilot → `AGENTS.md`. Same content.)*

```markdown
# Project

## What this is
[one sentence]

## Current state
[what works, what doesn't yet]

## Do not touch
- [file/folder] — [why]

## Rules
- Do not modify files I did not ask you to modify
- Do not refactor working code without being asked
- If unsure, say "I don't know". Never present a guess as fact
- Never report something as done without verifying it
```

### Why "do not" instead of "please do"

`Please write clean code` does nothing. There's no threshold for *clean*,
so no behavior changes.

**Prohibitions have a clear edge. They land immediately.**

| ❌ No effect | ⭕ Works |
|---|---|
| Write clean code | Do not modify files I didn't ask about |
| Be careful | Do not merge without tests |
| Keep it organized | Do not touch `legacy/` |

---

## 5 prompts that prevent breakage

### 1. Before letting it change anything
```
Don't write code yet. First tell me which files you'd touch
and where the risky parts are.
```
Starting with *"fix it"* means the model edits things **it can't itself account for.**
Getting the plan first kills most collateral damage.

### 2. When you're scared it'll break something
```
Before changing this, tell me what else is affected by it.
```
Works better than scolding. It ends up confessing:
*"ah, this is coupled to the character class."*

### 3. When you get "Done!"
```
Don't tell me it works. Write a test and show me it passes.
```
Models are **bad at catching their own errors.** They review with the same
assumptions they built with — so a wrong assumption survives both passes.
"Looks good" is an opinion. A passing test is evidence.

### 4. Before starting a fresh chat
```
Summarize: what's done / what's next / what we tried and abandoned.
Write it so a fresh session can continue from that alone.
```
**"What we abandoned" is the important part.** Without it, the new session
confidently proposes the exact approach that just failed.

### 5. The line for your rules file
```
Do not modify files I did not ask you to modify.
```
Single highest-value line in the file.

---

## Context rots

Long sessions get worse, and it isn't your imagination.

As the conversation grows, **abandoned directions and corrected mistakes**
all keep counting as current context. The signal gets buried in its own history.

**Start a fresh session every 3–5 tasks.** Run prompt #4 before you close.

### Anger is the signal

If you're asking for the same thing a **third** time, stop rewording the request
and **change the window.** That session can no longer produce the answer.
Pushing harder only raises your blood pressure.

---

## Make everything reversible

If git feels like a wall, you don't need the commands. Just say:

```
Before starting:   save the current state
When it breaks:    restore the state you saved
```

Nobody plays a game without saving. Same rule.

---

## One rule for permissions

> **Can Ctrl+Z undo this?**

| Just let it run | Always confirm first |
|---|---|
| Reading, searching, analyzing | Deleting |
| Local edits (if you saved state) | Deploying |
| Drafting | Sending email / messages |
| Running tests | Payments, orders |

All-or-nothing is the worst setting. Gate the irreversible, free the rest.

### Kill switch

Put this in your rules file:

```
If a file named STOP.txt exists in this folder, halt all work immediately.
```

One file stops everything. With it you can leave things running. Without it you can't.

---

## Failures are training data

Every time the model gets something wrong, **append that sentence to your rules file.**

Rules you imagine in advance are mostly useless.
**Rules extracted from actual breakage are the ones that hold.**

```markdown
## Known traps
- Stock deduction in order_service.py sits outside the transaction. Known, leaving it
- test_payment.py hits the live API. Don't run it casually
- We tried the event-driven approach and dropped it. Do not propose it again
```

Do this for a week and it stops repeating itself.

---

## Summary

- Keep the explanation in a file (`CLAUDE.md`)
- Get the plan before the code
- Save state so you can roll back
- Whoever built it doesn't get to grade it
- Gate only what's irreversible
- "Done" means evidence, not a claim

Don't try to adopt all of it. **Write the `CLAUDE.md` tonight.** That one file
changes tomorrow.

---

## Contributing

If you have a line that actually works for you, open a PR or an issue.
Real ones only — rules that survived contact with a real codebase.

## Stuck right now?

- Ask a question → https://avenna01-ceo.github.io/makhyeoss/
- Threads (KR) → [@k_aria26](https://www.threads.com/@k_aria26)

Free. If I can solve it I will; if I can't I'll say so.
