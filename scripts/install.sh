#!/usr/bin/env bash
set -euo pipefail

TOOLKIT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

TOOLKITS=("vite-react" "nestjs" "python" "dotnet")

usage() {
  echo "Usage: $0 [toolkit...] [--target <dir>]"
  echo ""
  echo "Toolkits: ${TOOLKITS[*]}, all"
  echo ""
  echo "Options:"
  echo "  --target <dir>   Project directory to install into (default: current directory)"
  echo "  -h, --help       Show this help"
  echo ""
  echo "Examples:"
  echo "  $0 nestjs"
  echo "  $0 vite-react nestjs"
  echo "  $0 all --target ~/my-project"
  exit 0
}

install_toolkit() {
  local toolkit="$1"
  local target="$2"
  local src="$TOOLKIT_DIR/$toolkit"

  if [[ ! -d "$src" ]]; then
    echo "ERROR: toolkit '$toolkit' not found at $src" >&2
    exit 1
  fi

  echo "Installing $toolkit..."

  mkdir -p "$target/.claude/agents" "$target/.claude/commands"

  # agents
  if compgen -G "$src/agents/*.md" > /dev/null 2>&1; then
    cp "$src/agents/"*.md "$target/.claude/agents/"
    echo "  agents -> $target/.claude/agents/"
  fi

  # commands
  if compgen -G "$src/commands/*.md" > /dev/null 2>&1; then
    cp "$src/commands/"*.md "$target/.claude/commands/"
    echo "  commands -> $target/.claude/commands/"
  fi

  # skills -> ~/.claude/skills/
  if [[ -d "$src/skills" ]] && [[ -n "$(ls -A "$src/skills")" ]]; then
    mkdir -p "$HOME/.claude/skills"
    cp -r "$src/skills/"* "$HOME/.claude/skills/"
    echo "  skills -> ~/.claude/skills/"
  fi

  # CLAUDE.md
  if [[ -f "$src/CLAUDE.md" ]]; then
    mkdir -p "$target/.claude"
    if [[ -f "$target/.claude/CLAUDE.md" ]]; then
      echo "" >> "$target/.claude/CLAUDE.md"
      cat "$src/CLAUDE.md" >> "$target/.claude/CLAUDE.md"
      echo "  CLAUDE.md appended -> $target/.claude/CLAUDE.md"
    else
      cp "$src/CLAUDE.md" "$target/.claude/CLAUDE.md"
      echo "  CLAUDE.md -> $target/.claude/CLAUDE.md"
    fi
  fi
}

# Parse args
selected=()
target="$(pwd)"
i=1
while [[ $i -le $# ]]; do
  arg="${!i}"
  case "$arg" in
    -h|--help) usage ;;
    --target)
      i=$((i+1))
      target="${!i}"
      ;;
    all)
      selected=("${TOOLKITS[@]}")
      ;;
    vite-react|nestjs|python|dotnet)
      selected+=("$arg")
      ;;
    *)
      echo "ERROR: Unknown argument '$arg'" >&2
      usage
      ;;
  esac
  i=$((i+1))
done

if [[ ${#selected[@]} -eq 0 ]]; then
  echo "No toolkit specified."
  echo ""
  usage
fi

# Deduplicate
IFS=$'\n' read -r -a selected <<< "$(printf '%s\n' "${selected[@]}" | sort -u)"

mkdir -p "$target"
target="$(cd "$target" && pwd)"
echo "Target: $target"
echo ""

for toolkit in "${selected[@]}"; do
  install_toolkit "$toolkit" "$target"
done

echo ""
echo "Done."
