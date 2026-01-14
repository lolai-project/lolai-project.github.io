# Contributing to LOLAI

Thank you for your interest in contributing to LOLAI! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs or suggest features
- Search existing issues before creating a new one
- Provide detailed information including steps to reproduce

### Adding New Agents

1. **Fork the Repository**
   ```bash
   git clone https://github.com/lolai-project/lolai-project.github.io.git
   cd lolai
   ```

2. **Create a New Branch**
   ```bash
   git checkout -b add-agent-name
   ```

3. **Add Agent File**
   
   Create a new markdown file in `_agents/`:
   ```bash
   touch _agents/your-agent-name.md
   ```

4. **Follow the Template**
   
   Use this structure:
   ```markdown
   ---
   layout: agent
   title: Agent Name
   vendor: Company/Project
   category: Code Assistant | Autonomous Agent | Security Tool | System Automation | Research Assistant
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
   [Brief description]

   ## Attack Vectors
   [Documented abuse scenarios]

   ## Artifacts
   [Logs, configs, IOCs]

   ## Detection
   [Detection methods]

   ## Prevention
   [Mitigation techniques]

   ## References
   [Links to sources]
   ```

5. **Commit Your Changes**
   ```bash
   git add _agents/your-agent-name.md
   git commit -m "Add [Agent Name] documentation"
   ```

6. **Push and Create PR**
   ```bash
   git push origin add-agent-name
   ```
   Then create a Pull Request on GitHub.

## 📋 Content Guidelines

### Quality Standards

- **Accuracy**: All information must be verified and accurate
- **References**: Include credible sources and documentation
- **Completeness**: Cover all template sections thoroughly
- **Clarity**: Write clearly and concisely

### MITRE ATT&CK Mapping

- Use correct technique IDs (e.g., T1059, T1106)
- Verify techniques at [attack.mitre.org](https://attack.mitre.org/)
- Include sub-techniques when relevant (e.g., T1059.001)

### Code Examples

```python
# ✅ Good: Clear, realistic, educational
def exploit_example():
    # This demonstrates the vulnerability
    os.system('malicious_command')

# ❌ Bad: Working exploit code for 0-days
# Don't include actual exploit code
```

### Sensitive Information

**DO NOT include:**
- Working 0-day exploits
- Real credentials or API keys
- Specific victim information
- Techniques for active campaigns

**DO include:**
- Educational examples
- Detection methods
- Mitigation strategies
- Public vulnerability information

## 🎯 Categories

Use these standard categories:

- **Code Assistant**: IDE integrations, code completion tools
- **Autonomous Agent**: Self-directed AI agents
- **Security Tool**: AI-powered security applications
- **System Automation**: RPA and automation tools
- **Research Assistant**: Research and analysis tools
- **Creative Tool**: Content generation and creative applications

## 🔍 Review Process

1. **Automated Checks**
   - YAML front matter validation
   - Markdown linting
   - Link checking

2. **Manual Review**
   - Technical accuracy
   - Content completeness
   - MITRE mapping correctness
   - Writing quality

3. **Merge**
   - Approved PRs are merged by maintainers
   - Changes deploy automatically to GitHub Pages

## 🐛 Bug Reports

When reporting bugs, include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, screen size
- **Screenshots**: If applicable

## 💡 Feature Requests

For new features:

- Check if it already exists or is planned
- Explain the use case
- Describe the expected functionality
- Consider implementation complexity


## 📝 Style Guide

### Markdown

- Use ATX-style headers (`#`, `##`, `###`)
- One blank line between sections
- Use fenced code blocks with language tags
- Keep lines under 120 characters when possible

### Writing

- Use active voice
- Be concise and direct
- Use technical terms appropriately
- Define acronyms on first use
- Use American English spelling

### Code

- Include language tags in code blocks
- Add comments for clarity
- Use realistic examples
- Sanitize sensitive information

## 🏆 Recognition

Contributors will be:

- Listed in project README
- Credited in commit history
- Acknowledged in release notes
- Invited to join maintainer team (for significant contributions)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 📬 Questions?

- Open a [Discussion](https://github.com/lolai-project/lolai-project.github.io/discussions)
- Reach out at [X](https://x.com/s0ld133rr)

---

Thank you for helping make LOLAI a valuable resource for the security community! 🙏
