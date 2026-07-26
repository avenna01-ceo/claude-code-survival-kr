#!/usr/bin/env python3
"""Block edits to protected files — a PreToolUse hook for Claude Code.

CLAUDE.md is advice. The model reads it, then a long conversation buries it and
it edits the file anyway. This is not a prompting problem, so no wording fixes it.

This script is not advice. It runs before the tool call and can refuse it.

Install
    1. copy this file to  .claude/guard.py  in your project
    2. copy .claude/settings.json from this folder (or merge the "hooks" key)
    3. list what must never be touched in  .claude/protected.txt

Contract (Claude Code PreToolUse hook)
    stdin   JSON with tool_name and tool_input
    exit 0  allow
    exit 2  block the tool call; stderr is shown to the model

No dependencies. Python 3.8+.
"""
from __future__ import annotations

import fnmatch
import json
import os
import sys
from pathlib import Path

# Tools that write to disk. Anything else is allowed through untouched.
WRITE_TOOLS = {"Edit", "Write", "MultiEdit", "NotebookEdit"}

# Used when .claude/protected.txt is missing. Keep it boring and obvious.
DEFAULT_PATTERNS = [
    ".env",
    ".env.*",
    "**/.env",
    "**/*.pem",
    "**/*.key",
    "**/id_rsa*",
    "**/credentials.json",
    "**/secrets.*",
    ".claude/guard.py",        # don't let it disable its own guard
    ".claude/protected.txt",
    ".claude/settings.json",
]

COMMENT_PREFIXES = ("#", "//")


def find_config(project: Path) -> Path | None:
    """Locate .claude/protected.txt.

    The cwd in the hook payload is normally the project root, but it can be a
    path this process can't resolve the same way (shell-mapped paths on Windows,
    for one). Falling back to the real working directory and to the folder this
    script sits in keeps a user's rules from being silently ignored.
    """
    candidates = [
        project / ".claude" / "protected.txt",
        Path.cwd() / ".claude" / "protected.txt",
        Path(__file__).resolve().parent / "protected.txt",
    ]
    seen = set()
    for c in candidates:
        key = str(c)
        if key in seen:
            continue
        seen.add(key)
        if c.is_file():
            return c
    return None


def load_patterns(project: Path) -> tuple[list[str], bool]:
    """Read .claude/protected.txt. Returns (patterns, used_defaults)."""
    cfg = find_config(project)
    if cfg is None:
        return DEFAULT_PATTERNS, True

    patterns: list[str] = []
    for raw in cfg.read_text(encoding="utf-8", errors="replace").splitlines():
        line = raw.strip()
        if not line or line.startswith(COMMENT_PREFIXES):
            continue
        patterns.append(line)
    # An empty file means "protect nothing" — respect that instead of
    # silently falling back to the defaults.
    return patterns, False


def target_paths(tool_input: dict) -> list[str]:
    """Every path this tool call would write to."""
    out: list[str] = []
    for key in ("file_path", "notebook_path", "path"):
        v = tool_input.get(key)
        if isinstance(v, str) and v:
            out.append(v)
    # MultiEdit variants carry a list of edits, each possibly with its own path
    edits = tool_input.get("edits")
    if isinstance(edits, list):
        for e in edits:
            if isinstance(e, dict):
                v = e.get("file_path")
                if isinstance(v, str) and v:
                    out.append(v)
    return out


def relative_to_project(path: str, project: Path) -> str:
    """Project-relative POSIX path, or the absolute one if it sits outside."""
    try:
        p = Path(path).expanduser().resolve()
    except (OSError, RuntimeError):
        return path.replace("\\", "/")
    # Try the payload's project root first, then the real cwd — same reason as
    # find_config. A directory pattern like `migrations/**` only works if we
    # manage to make the path relative to *something*.
    for base in (project, Path.cwd()):
        try:
            return p.relative_to(base).as_posix()
        except ValueError:
            continue
    return p.as_posix()


def matches(rel: str, pattern: str) -> bool:
    """Glob match that behaves the way people expect when they write rules.

    `.env` matches `.env` anywhere, not only at the root, because that is what
    someone means when they type it. `src/**` matches everything under src/.
    """
    name = rel.rsplit("/", 1)[-1]
    if fnmatch.fnmatch(rel, pattern) or fnmatch.fnmatch(name, pattern):
        return True
    if pattern.endswith("/**") and rel.startswith(pattern[:-3] + "/"):
        return True
    if pattern.endswith("/") and rel.startswith(pattern):
        return True
    return False


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        # A hook that crashes must not become a hook that blocks all work.
        return 0

    if payload.get("tool_name") not in WRITE_TOOLS:
        return 0

    tool_input = payload.get("tool_input") or {}
    if not isinstance(tool_input, dict):
        return 0

    project = Path(payload.get("cwd") or os.getcwd()).resolve()
    patterns, used_defaults = load_patterns(project)
    if not patterns:
        return 0

    for path in target_paths(tool_input):
        rel = relative_to_project(path, project)
        for pattern in patterns:
            if matches(rel, pattern):
                where = "guard.py defaults" if used_defaults else ".claude/protected.txt"
                sys.stderr.write(
                    f"Blocked by guard.py: {rel}\n"
                    f"It matches the pattern '{pattern}' listed in {where}.\n"
                    f"Do not try another tool or another path to reach this file. "
                    f"Tell the user it is protected and ask them to edit it themselves.\n"
                )
                return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
