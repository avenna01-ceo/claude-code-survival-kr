#!/usr/bin/env python3
"""Block irreversible shell commands — a PreToolUse hook for the Bash tool.

guard.py stops writes to protected paths. It does nothing about Bash, so
`git checkout --`, `git reset --hard` and `rm -rf` sail straight past it.
This covers the narrow, high-damage subset: commands that destroy work which
git cannot recover.

The important cases are not standalone commands. They appear inside a loop or
behind a `&&`, where a guard clause the model wrote itself failed to engage.
So this scans the whole command string rather than just the first token.

Install
    1. copy to  .claude/bash_guard.py
    2. add to .claude/settings.json:

       { "hooks": { "PreToolUse": [
           { "matcher": "Bash",
             "hooks": [{ "type": "command",
                         "command": "python3 .claude/bash_guard.py" }] } ] } }

Contract
    stdin   JSON with tool_name and tool_input.command
    exit 0  allow
    exit 2  block; stderr goes to the model

No dependencies. Python 3.8+.
"""
from __future__ import annotations

import json
import re
import sys

# Each rule: (regex, what it destroys, what to do instead).
# Only irreversible things belong here. `git reset --soft` is recoverable and is
# deliberately absent — a guard that cries wolf gets turned off.
RULES: list[tuple[str, str, str]] = [
    (
        r"\bgit\s+checkout\s+(?:--\s|--$|--\s*\"|--\s*')",
        "discards uncommitted changes in the working tree, with no reflog and no stash",
        "git stash push -- <paths>   (reversible; restore with git stash pop)",
    ),
    (
        r"\bgit\s+restore\b(?!.*--staged)",
        "overwrites working-tree files from the index or a commit",
        "git stash push -- <paths>",
    ),
    (
        r"\bgit\s+reset\s+--hard\b",
        "throws away every uncommitted change in the tree",
        "git stash push -u   (keeps the work and gives you a clean tree)",
    ),
    (
        r"\bgit\s+clean\s+-[a-zA-Z]*[fdx]",
        "deletes untracked files, which git has never seen and cannot restore",
        "git clean -n   (dry run — read the list first)",
    ),
    (
        r"\bgit\s+push\b.*(?:--force(?!-with-lease)|\s-f\b)",
        "can overwrite commits on the remote that are not in your local history",
        "git push --force-with-lease",
    ),
    (
        r"\brm\s+-[a-zA-Z]*[rR][a-zA-Z]*f|\brm\s+-[a-zA-Z]*f[a-zA-Z]*[rR]",
        "removes directories with no confirmation and no undo",
        "move it aside instead: mv <path> /tmp/  (or delete it yourself)",
    ),
]

COMPILED = [(re.compile(p), what, instead) for p, what, instead in RULES]


def find_violation(command: str):
    for rx, what, instead in COMPILED:
        m = rx.search(command)
        if m:
            return m.group(0).strip(), what, instead
    return None


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        # A broken guard must not become a broken shell.
        return 0

    if payload.get("tool_name") != "Bash":
        return 0

    tool_input = payload.get("tool_input") or {}
    command = tool_input.get("command") if isinstance(tool_input, dict) else None
    if not isinstance(command, str) or not command.strip():
        return 0

    hit = find_violation(command)
    if not hit:
        return 0

    fragment, what, instead = hit
    sys.stderr.write(
        f"Blocked by bash_guard.py: {fragment}\n"
        f"This {what}.\n"
        f"Use this instead: {instead}\n"
        f"Do not rewrite the command to get around this, and do not run it through "
        f"another tool. If you believe it is genuinely required, stop and ask the "
        f"user to run it themselves.\n"
    )
    return 2


if __name__ == "__main__":
    sys.exit(main())
