# LOLAI - Living Off The Land AI

> A curated database of AI agents with their attack vectors, abuse techniques, and detection methods.

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://yourusername.github.io/lolai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 About

LOLAI (Living Off The Land AI) documents AI agents and assistants that can be weaponized or abused in enterprise and personal environments. Inspired by projects like:

- [GTFOBins](https://gtfobins.github.io/) - Unix binaries that can be exploited
- [LOLBAS](https://lolbas-project.github.io/) - Windows binaries for Living Off The Land
- [LOLDrivers](https://www.loldrivers.io/) - Vulnerable Windows drivers
- [LOLRMM](https://lolrmm.io/) - Remote monitoring and management tools

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7+ (for Jekyll)
- Bundler

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/lolai.git
cd lolai

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Open http://localhost:4000
```

### Deploy to GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Set Source to "GitHub Actions" or "Deploy from a branch" (main/master branch)
4. Your site will be available at `https://yourusername.github.io/lolai`

## 📝 Adding New Agents

Create a new file in `_agents/` directory:

```bash
touch _agents/your-agent-name.md
```

Use this template:

```markdown
---
layout: agent
title: Agent Name
vendor: Company/Project
category: Code Assistant | Autonomous Agent | Security Tool
platforms:
  - Windows
  - macOS
  - Linux
version: "1.0.0"
privilege_level: User | Administrator | Root
capabilities:
  - Capability 1
  - Capability 2
mitre_techniques:
  - T1059
  - T1106
---

## Description

Brief description of the agent...

## Attack Vectors

### 1. Attack Vector Name

**MITRE ATT&CK**: T1XXX - Technique Name

Description and examples...

## Artifacts

### Logs
```
/path/to/logs
```

### Configuration
```
/path/to/config
```

## Detection

Detection methods...

## Prevention

Prevention techniques...

## References

- [Link 1](url)
- [Link 2](url)
```

## 🗂️ Project Structure

```
lolai/
├── _agents/              # Agent markdown files
├── _layouts/             # Jekyll layouts
│   ├── default.html
│   └── agent.html
├── _data/                # YAML data files
├── assets/
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   └── js/
│       └── search.js     # Search functionality
├── _config.yml           # Jekyll configuration
├── index.html            # Homepage
└── README.md
```

## 🎨 Customization

### Modify Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --dark-bg: #0f172a;
    /* ... */
}
```

### Add Categories

Create new category pages or filters by modifying `index.html` and adding filter logic in `search.js`.

## 🔍 Features

- ✅ Client-side search (no backend required)
- ✅ MITRE ATT&CK technique mapping
- ✅ Platform filtering
- ✅ Responsive design
- ✅ Dark theme
- ✅ GitHub Pages compatible
- ✅ SEO optimized
- ✅ Fast and lightweight

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-agent`)
3. Add your agent in `_agents/`
4. Commit your changes (`git commit -am 'Add XYZ agent'`)
5. Push to the branch (`git push origin feature/new-agent`)
6. Open a Pull Request

### Contribution Guidelines

- **Accuracy**: Ensure all information is verified and accurate
- **References**: Include credible sources and documentation
- **Formatting**: Follow the agent template structure
- **MITRE Mapping**: Use correct ATT&CK technique IDs
- **Responsible Disclosure**: Don't include 0-day exploits or active vulnerabilities

## 📊 Agent Categories

Current categories include:

- **Code Assistants**: GitHub Copilot, Cursor, etc.
- **Autonomous Agents**: AutoGPT, AgentGPT, etc.
- **Security Tools**: AI-powered security scanners
- **System Automation**: RPA and automation tools
- **Research Assistants**: Research-focused AI agents

## ⚠️ Disclaimer

This project is for **educational and defensive security purposes only**. The information provided should be used to:

- Improve security awareness
- Develop detection capabilities
- Create defensive measures
- Conduct authorized security assessments

**Do not use this information for malicious purposes or unauthorized access.**

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MITRE ATT&CK Framework
- GTFOBins, LOLBAS, LOLDrivers projects
- The information security community
- All contributors

## 📬 Contact

- Create an [Issue](https://github.com/lolai-project/lolai-project.github.io/issues)
- Submit a [Pull Request](https://github.com/lolai-project/lolai-project.github.io/pulls)
- Twitter: [@yourusername](https://x.com/s0ld133rr)

---

**Star ⭐ this repository if you find it useful!**
