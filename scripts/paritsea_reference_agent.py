#!/usr/bin/env python3
"""
Paritsea reference agent.

This is a lightweight OpenAI Agents SDK example tailored to the Paritsea repo.
It can answer questions about the framework, UX copy, routing, and documented
implementation decisions by reading local repo files when needed.

Usage examples:
    ./.venv-openai-agents/bin/python scripts/paritsea_reference_agent.py \
        "Summarise the role of Implementations in the Paritsea IP architecture."

    ./.venv-openai-agents/bin/python scripts/paritsea_reference_agent.py \
        "Review the licensing guidance and tell me what readers may do without permission." \
        --content-file docs/brand-positioning-and-ux-copy-guide.md
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

from agents import Agent, Runner, RunConfig, function_tool
from agents.extensions.models.litellm_model import LitellmModel
from dotenv import load_dotenv

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_GEMINI_MODEL = "gemini/gemini-2.5-flash-lite"
DEFAULT_QWEN_MODEL = "dashscope/qwen-turbo"
PROJECT_MEMORY_PATH = REPO_ROOT / "PROJECT_MEMORY.md"
ALLOWED_ROOTS = [
	REPO_ROOT / "docs",
	REPO_ROOT / "src",
	REPO_ROOT / "seed",
	REPO_ROOT / "sql",
	REPO_ROOT / "scripts",
	REPO_ROOT,
]

load_dotenv(REPO_ROOT / ".env.local")
load_dotenv(REPO_ROOT / ".env")


def _resolve_repo_path(raw_path: str) -> Path:
	candidate = Path(raw_path)
	if not candidate.is_absolute():
		candidate = (REPO_ROOT / candidate).resolve()
	else:
		candidate = candidate.resolve()

	if not candidate.exists():
		raise FileNotFoundError(f"File not found: {candidate}")

	if not any(
		candidate == allowed or allowed in candidate.parents
		for allowed in ALLOWED_ROOTS
	):
		raise PermissionError(
			f"Path is outside the approved repo scope: {candidate}"
		)

	return candidate


def _truncate_text(value: str, limit: int = 14000) -> str:
	if len(value) <= limit:
		return value
	return f"{value[:limit]}\n\n[Truncated {len(value) - limit} characters]"


def resolve_model_choice() -> tuple[str | LitellmModel, str]:
	"""
	Choose the default provider for zero-paid-overage usage.

	Order:
	1. Explicit OPENAI_MODEL env override
	2. Gemini Flash-Lite via LiteLLM if GEMINI_API_KEY / GOOGLE_API_KEY exists
	3. Qwen via DashScope if DASHSCOPE_API_KEY exists
	4. Raise a setup error instead of silently using a paid fallback
	"""
	explicit_model = os.getenv("OPENAI_MODEL")
	if explicit_model:
		if "/" in explicit_model:
			return LitellmModel(explicit_model), explicit_model
		return explicit_model, explicit_model

	if os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"):
		return LitellmModel(DEFAULT_GEMINI_MODEL), DEFAULT_GEMINI_MODEL

	if os.getenv("DASHSCOPE_API_KEY"):
		return LitellmModel(DEFAULT_QWEN_MODEL), DEFAULT_QWEN_MODEL

	raise RuntimeError(
		"No free-tier provider is configured. Set GEMINI_API_KEY/GOOGLE_API_KEY "
		"for Gemini Developer API, or DASHSCOPE_API_KEY for Qwen via DashScope."
	)


@function_tool
def load_project_memory() -> str:
	"""Load the project's architecture memory and implementation notes."""
	return PROJECT_MEMORY_PATH.read_text(encoding="utf-8")


@function_tool
def read_repo_file(path: str) -> str:
	"""Read a UTF-8 text file from the Paritsea repository by relative or absolute path."""
	resolved = _resolve_repo_path(path)
	return _truncate_text(resolved.read_text(encoding="utf-8"))


def build_agent() -> Agent:
	model, _model_label = resolve_model_choice()
	return Agent(
		name="Paritsea Reference Agent",
		model=model,
		instructions=(
			"You are the Paritsea reference agent. Help with framework interpretation, "
			"information architecture, editorial wording, UX copy, routing, and site "
			"implementation decisions. Use the local repo tools before guessing when "
			"the answer depends on repo context. When you rely on a file, mention the "
			"path in your answer. Be concise but concrete."
		),
		tools=[load_project_memory, read_repo_file],
	)


def build_input(question: str, content_file: str | None) -> str:
	parts: list[str] = [
		"You are answering a question about the Paritsea project.",
		f"Question: {question.strip()}",
	]

	if content_file:
		resolved = _resolve_repo_path(content_file)
		content = _truncate_text(resolved.read_text(encoding="utf-8"))
		parts.extend(
			[
				f"Primary reference file: {resolved}",
				"File contents:",
				content,
			]
		)

	return "\n\n".join(parts)


def parse_args() -> argparse.Namespace:
	parser = argparse.ArgumentParser(
		description="Run a Paritsea-focused OpenAI agent against repo context."
	)
	parser.add_argument(
		"question",
		nargs="?",
		help="The question to ask the agent. If omitted, the script will prompt for one.",
	)
	parser.add_argument(
		"--content-file",
		help="Optional repo file to include directly as primary context.",
	)
	parser.add_argument(
		"--model",
		help=(
			"Override the model for this run. By default the script prefers "
			"gemini/gemini-2.5-flash-lite when GEMINI_API_KEY or GOOGLE_API_KEY is "
			"set, then falls back to dashscope/qwen-turbo when DASHSCOPE_API_KEY is set."
		),
	)
	return parser.parse_args()


def main() -> int:
	args = parse_args()

	if args.model:
		os.environ["OPENAI_MODEL"] = args.model

	question = args.question
	if not question:
		try:
			question = input("Ask Paritsea Reference Agent: ").strip()
		except EOFError:
			question = ""

	if not question:
		print("No question provided.", file=sys.stderr)
		return 1

	try:
		_model, model_label = resolve_model_choice()
		agent = build_agent()
		run_config = RunConfig(
			model=None if "/" in model_label else model_label,
			tracing_disabled=True,
		)
		result = Runner.run_sync(
			agent,
			build_input(question, args.content_file),
			run_config=run_config,
		)
	except Exception as exc:  # pragma: no cover - operational error path
		print(f"Agent run failed: {exc}", file=sys.stderr)
		return 1

	output = getattr(result, "final_output", None)
	if output is None:
		print("No final output returned.", file=sys.stderr)
		return 1

	print(f"[model: {model_label}]\n")
	print(str(output).strip())
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
