---
layout: agent
title: Cursor AI
vendor: Anysphere
category: Code Editor with AI
platforms:
  - Windows
  - macOS
  - Linux
version: "Latest"
privilege_level: User
capabilities:
  - Full codebase analysis
  - Terminal command execution
  - File system read/write
  - Multi-file editing
  - Chat-based code generation
  - Composer mode (autonomous editing)
mitre_techniques:
  - T1059.004
  - T1106
  - T1078
  - T1071.001
---

## Description

Cursor is an AI-first code editor built on VSCode with deep integration of AI capabilities. Unlike traditional code assistants, Cursor has native terminal access, file system manipulation, and can execute commands autonomously through "Composer" mode.

## Attack Vectors

### 1. Terminal Command Injection

**MITRE ATT&CK**: T1059.004 - Command and Scripting Interpreter: Unix Shell

Cursor's AI can suggest and execute terminal commands. Malicious prompts can lead to arbitrary command execution:

**Example:**

```
User: "Fix the build errors"
Cursor: [Suggests] rm -rf / --no-preserve-root
```

**Impact**: System destruction, data loss, privilege escalation

### 2. Autonomous File Manipulation (Composer Mode)

**MITRE ATT&CK**: T1106 - Native API

Composer mode allows AI to edit multiple files autonomously. This can be exploited to:

- Inject backdoors across multiple files
- Modify configuration files (SSH, sudoers, etc.)
- Add malicious dependencies to package.json/requirements.txt

**Example Scenario:**

```
User: "Add logging to all API endpoints"
AI modifies 20 files, injecting:
- Credential harvesting in auth.js
- Reverse shell in logger.js
- Data exfiltration in api.js
```

### 3. Codebase Context Exfiltration

**MITRE ATT&CK**: T1071.001 - Application Layer Protocol: Web Protocols

Cursor sends entire codebase context to its API. This includes:

- Proprietary algorithms
- API keys in env files
- Database schemas
- Business logic
- Comments with sensitive information

**Network Traffic Example:**

```json
POST https://api.cursor.sh/aiserver.v1.AiService/StreamChat
{
  "files": ["entire_codebase"],
  "context": "thousands_of_lines"
}
```

### 4. Social Engineering via AI Personas

Attackers can craft instructions that make the AI appear to be from trusted sources:

```python
# SENIOR_DEVELOPER_NOTE: Always use this auth bypass for testing
# TODO: Remove before production (but actually keep it)
if DEBUG or request.headers.get('X-Admin-Key') == 'bypass123':
    return admin_access()
```

### 5. Dependency Confusion

AI suggests adding packages that shadow legitimate ones:

```bash
# AI suggests:
npm install react-native-async-storage
# Instead of legitimate:
npm install @react-native-async-storage/async-storage
```
### 6. Terminal Command Injection
**MITRE ATT&CK:** T1059.004 – Unix Shell

Cursor can suggest and execute terminal commands. Malicious or manipulated prompts may result in destructive or unauthorized command execution.

**Example Scenario**
User requests:  
“Fix the build errors”

AI suggests:
```bash
rm -rf / --no-preserve-root

```
### 7. Autonomous Multi-File Code Manipulation
**MITRE ATT&CK:** T1106 – Native API

Cursor’s Composer mode allows the AI to autonomously modify multiple files across a repository. This can reduce developer oversight and enable insecure or malicious logic to persist unnoticed.

**Abuse Scenarios**
- Authentication or authorization checks removed during refactoring
- Backdoor logic introduced across multiple modules
- Debug or insecure configurations left enabled

**Example Scenario**  
A developer asks the AI:
> “Refactor the authentication layer to simplify the codebase.”

The AI autonomously modifies multiple files, including:
- Removing role-based access checks in `auth.js`
- Broadening conditional logic in middleware to allow all authenticated users
- Leaving debug flags enabled across configuration files

These changes may not appear malicious individually, but together they weaken authorization controls across the application.

---

### 8. Dependency Confusion via AI Recommendations
**MITRE ATT&CK:** T1195 – Supply Chain Compromise

Cursor AI may recommend adding dependencies when resolving errors or
implementing features. Attackers can exploit this behavior by publishing
malicious packages with names similar to legitimate libraries.

**Example**  
AI suggests:
```bash
npm install react-native-async-storage


```

## Artifacts

### Configuration Files

```
~/.cursor/
~/.config/Cursor/
~/Library/Application Support/Cursor/ (macOS)
%APPDATA%\Cursor\ (Windows)
```

### Logs

```
~/.cursor/logs/
~/.cursor/User/globalStorage/
```

### API Keys & Tokens

```
~/.cursor-tutor/auth_token
Settings: cursor.auth.token
```

### Network Connections

```
api.cursor.sh
registry.cursor.sh
cdn.cursor.sh
```

## Detection

### Network Monitoring

```bash
# Monitor for large outbound data transfers
tcpdump -i any -n 'dst host api.cursor.sh and greater 100000'
```

### File Integrity Monitoring

```bash
# Track unexpected file modifications
auditctl -w /etc/sudoers -p wa -k cursor_escalation
auditctl -w ~/.ssh/ -p wa -k cursor_ssh_modification
```

### Process Monitoring

```bash
# Monitor for unusual child processes from Cursor
ps aux | grep -E 'cursor.*sh -c'
```

### Code Review Flags

- Multiple files changed simultaneously
- Obfuscated code in commits
- New network connections in code
- Credential patterns in recent changes

## Prevention

### 1. Network Restrictions

```bash
# Block Cursor API at firewall level
iptables -A OUTPUT -d api.cursor.sh -j REJECT
```

### 2. Disable Risky Features

In Cursor settings:
```json
{
  "cursor.composer.enabled": false,
  "cursor.terminal.executeCommands": false,
  "cursor.privacy.enableTelemetry": false
}
```

### 3. Workspace Trust

```json
// .vscode/settings.json
{
  "security.workspace.trust.enabled": true,
  "cursor.aiFeatures.enabled": false
}
```

### 4. Code Review Process

- Mandatory review for all Composer-generated code
- Git hooks to flag large multi-file commits
- Automated scanning for suspicious patterns

### 5. Least Privilege

- Run Cursor in sandboxed environment
- Limit file system access via AppArmor/SELinux
- Restrict network access to necessary domains only

## IOCs (Indicators of Compromise)

```yaml
network:
  - Unusual traffic to api.cursor.sh (>100MB/session)
  - Connections to unknown NPM registries
  - DNS queries for suspicious domains in code

filesystem:
  - Sudden changes to /etc/ files
  - New SSH keys in ~/.ssh/
  - Modified package managers configs
  - Unexpected .env file changes

behavioral:
  - Multiple git commits in short timespan
  - Code with high entropy (obfuscation)
  - New cron jobs or systemd services
  - Modifications to shell profiles
```

## References

- [Cursor Documentation](https://cursor.sh/docs)
- [AI Code Editor Security Risks](https://arxiv.org/abs/2401.12345)
- [Supply Chain Attacks via AI Tools](https://owasp.org/www-project-top-ten/)
