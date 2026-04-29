# OpenAI Agents SDK In This Repo

Paritsea now includes a project-local Python environment for the OpenAI Agents SDK:

- environment: `/Users/paritr/Desktop/paritsea/.venv-openai-agents`
- verified package: `openai-agents==0.14.2`

## Quick Start

Activate the environment:

```bash
source /Users/paritr/Desktop/paritsea/.venv-openai-agents/bin/activate
```

Or run the agent directly without activating:

```bash
/Users/paritr/Desktop/paritsea/.venv-openai-agents/bin/python \
  /Users/paritr/Desktop/paritsea/scripts/paritsea_reference_agent.py \
  "Summarise the role of Implementations in Paritsea."
```

## Requirements

Configure at least one free-tier-capable provider before running.

Primary option:

```bash
export GEMINI_API_KEY=your_key_here
```

Alternative Gemini env name also supported:

```bash
export GOOGLE_API_KEY=your_key_here
```

Backup option:

```bash
export DASHSCOPE_API_KEY=your_key_here
```

Optional model override:

```bash
export OPENAI_MODEL=gemini/gemini-2.5-flash-lite
```

Or pass it per run:

```bash
/.venv-openai-agents/bin/python scripts/paritsea_reference_agent.py \
  "Review the licensing guidance." \
  --model gemini/gemini-2.5-flash-lite
```

## What The Example Agent Does

The scaffolded script at `/Users/paritr/Desktop/paritsea/scripts/paritsea_reference_agent.py` is tuned for Paritsea work:

- answers questions about architecture, routing, editorial wording, and implementation decisions
- can load `PROJECT_MEMORY.md` as a tool
- can read repo files on demand as a tool
- can also take a primary context file through `--content-file`

## Example Runs

```bash
./.venv-openai-agents/bin/python scripts/paritsea_reference_agent.py \
  "What is the difference between The Method and Implementations?"
```

```bash
./.venv-openai-agents/bin/python scripts/paritsea_reference_agent.py \
  "Review this page copy and suggest a stronger UK-English version." \
  --content-file docs/brand-positioning-and-ux-copy-guide.md
```

## Why This Approach

This is more useful than cloning the upstream example repo immediately because:

- it is already wired to this workspace
- it reflects Paritsea's architecture and terminology
- it is easier to extend into future site-side `Ask AI` features

## Default Model Choice

As of April 20, 2026, this repo now prefers no-extra-payment defaults for local agent runs:

- primary default when `GEMINI_API_KEY` or `GOOGLE_API_KEY` is present:
  - `gemini/gemini-2.5-flash-lite`
- backup when Gemini is not configured and `DASHSCOPE_API_KEY` is present:
  - `dashscope/qwen-turbo`

Why this default:

- `gemini-2.5-flash-lite` is the preferred no-extra-payment starting point via Gemini Developer API free tier
- it is also supported by LiteLLM in the local OpenAI Agents SDK environment
- `dashscope/qwen-turbo` is the backup path when you want Qwen instead
- the script no longer silently falls back to OpenAI for its default path

## Gemini Setup

Set either:

```bash
export GEMINI_API_KEY=your_key_here
```

or:

```bash
export GOOGLE_API_KEY=your_key_here
```

Then the scaffolded agent will automatically prefer `gemini/gemini-2.5-flash-lite`.

## Qwen Backup Setup

Set:

```bash
export DASHSCOPE_API_KEY=your_key_here
```

Then the scaffolded agent can use:

```bash
export OPENAI_MODEL=dashscope/qwen-turbo
```

or it will use `dashscope/qwen-turbo` automatically when Gemini is not configured.

Important operating note:

- if you use Qwen as the backup path, enable `Free Quota Only` in Alibaba Cloud Model Studio so the provider stops requests instead of charging beyond free quota
