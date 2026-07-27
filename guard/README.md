# guard.py — stop it from touching the files that matter

`CLAUDE.md` is advice. The model reads it, the conversation gets long, the rule
loses priority, and it edits the file anyway.

That is not a prompting problem. No wording fixes it.

**This is not advice. It runs before the tool call and refuses it.**

```
Blocked by guard.py: .env
It matches the pattern '.env' listed in .claude/protected.txt.
```

The model never gets to write. It gets told why, and moves on.

---

## Install (2 minutes)

```bash
mkdir -p .claude
curl -o .claude/guard.py        https://raw.githubusercontent.com/avenna01-ceo/claude-code-survival-kr/main/guard/guard.py
curl -o .claude/protected.txt   https://raw.githubusercontent.com/avenna01-ceo/claude-code-survival-kr/main/guard/protected.txt
curl -o .claude/settings.json   https://raw.githubusercontent.com/avenna01-ceo/claude-code-survival-kr/main/guard/settings.json
```

Already have a `.claude/settings.json`? Merge this in instead of overwriting:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit|NotebookEdit",
        "hooks": [{ "type": "command", "command": "python3 .claude/guard.py" }]
      }
    ]
  }
}
```

On Windows use `python` instead of `python3`.

Restart Claude Code. That's it — no dependencies, Python 3.8+.

---

## Choose what to protect

Edit `.claude/protected.txt`. One pattern per line.

```
.env
.env.*
*.pem
*.key
credentials.json

migrations/**
legacy/**

.claude/guard.py
.claude/protected.txt
.claude/settings.json
```

A bare filename matches **anywhere in the tree**, because that's what you mean
when you type it. `.env` blocks `./.env` and `api/.env` both. `dir/**` blocks
everything under that directory.

Keep the last three lines. They are what stops the model from disabling its own
guard when it gets stuck.

---

## Check it works

```bash
echo '{"tool_name":"Edit","tool_input":{"file_path":".env"},"cwd":"'"$PWD"'"}' | python3 .claude/guard.py; echo "exit=$?"
```

`exit=2` means it's live. `exit=0` on a protected path means the pattern didn't match.

---

## What it does and doesn't do

**Does**

- Blocks `Edit`, `Write`, `MultiEdit`, `NotebookEdit` on paths you list
- Reads every path in a `MultiEdit` batch, not just the first
- Returns the reason on stderr, so the model stops instead of retrying
- Fails **open** — if the hook itself errors, your work continues. A guard that
  breaks everything when it breaks is worse than no guard.

**Doesn't**

- Doesn't block `Bash`. `rm -rf` still goes through. Gate that separately, or
  add a `Bash` matcher and inspect the command string.
- Doesn't protect against a user who edits `protected.txt` themselves. It's a
  guardrail, not a permission system.

---

## Why a hook and not a rule

| | Where it lives | When it loses |
|---|---|---|
| `CLAUDE.md` | in the prompt | context gets long, priority drops |
| **hook** | in your machine | never — it isn't the model's decision |

Rules are advisory. Hooks are enforcement. Use both: `CLAUDE.md` for *why*,
`guard.py` for *can't*.

---

## What this doesn't solve

A hook can only stop things that end in a tool call. It can't stop the model from
continuing after you told it to stop, or from reporting work as done that it never
verified, or from confidently proposing the approach you already tried and abandoned.

Those are the failures that actually cost you a week, and they need a different kind of
fix — a rules file that carries *why*, a session boundary before the window rots, and a
habit of asking for evidence instead of accepting "Done!".

The [main README](../README.md) covers those. Free, and the useful half for most people.

If you want the long version, there's a 25-page field manual —
**[$19](https://gaiinmaster.gumroad.com/l/working-with-claude-code)** — with approval
gates, kill switches, cost control, when *not* to build an autonomous loop, 7 copy-paste
templates, and a chapter on not fooling yourself about results.

Don't buy it if you already design your own hooks and subagents. You wrote this script
yourself in your head while reading it.

---

Part of [claude-code-survival-kr](https://github.com/avenna01-ceo/claude-code-survival-kr) —
rules and prompts that stop AI from breaking working code. MIT.
