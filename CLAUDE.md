# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LOLAI (Living Off The Land AI) is a Jekyll-based static site documenting AI agents' attack vectors, abuse techniques, and detection methods. Inspired by GTFOBins, LOLBAS, and LOLDrivers projects.

**Live site**: https://lolai-project.github.io

### Git Conventions

- Commit messages пишутся на **русском языке**
- Группировать изменения в разные коммиты по смыслу
- **НЕ добавлять** "Generated with Claude Code" в commit messages
- Main branch для PR: `main`

## Build Commands

```bash
bundle install                    # Install Ruby dependencies
bundle exec jekyll serve          # Local dev server at localhost:4000
bundle exec jekyll build          # Build static site to _site/
bundle exec jekyll clean          # Clear build cache
```

## Architecture

**Static site generator**: Jekyll 4.3+ with kramdown/GFM markdown and rouge syntax highlighting.

**Key directories**:
- `_agents/` - Agent documentation as Markdown files with YAML front matter
- `_layouts/` - Liquid templates (`default.html` base, `agent.html` for individual agents)
- `assets/css/style.css` - Single unified stylesheet with CSS variables
- `assets/js/search.js` - Vanilla JS client-side search with debouncing

**Data flow**: Agent markdown files in `_agents/*.md` are processed by Jekyll and rendered via the `agent.html` layout to `/agents/{name}/`.

## Agent File Structure

Each agent file in `_agents/` requires this front matter:

```yaml
layout: agent
title: Agent Name
vendor: Company/Project
category: Code Assistant | Autonomous Agent | Security Tool | System Automation | Research Assistant
platforms: [Windows, macOS, Linux]
version: "X.X.X"
privilege_level: User | Administrator | Root
capabilities: [list of capabilities]
mitre_techniques: [T1059, T1106, ...]
```

Content sections: Description, Attack Vectors (with MITRE ATT&CK mappings), Artifacts, Detection, Prevention, References.

## Deployment

GitHub Actions automatically deploys to GitHub Pages on push to `main`. Workflow: `.github/workflows/jekyll.yml`.
