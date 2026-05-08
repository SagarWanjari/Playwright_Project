# AI-Powered Playwright Automation Framework

Enterprise-grade intelligent test automation framework built using Playwright + TypeScript with AI-assisted testing capabilities, API automation, CI/CD integration, self-healing strategies, and scalable architecture design.

---

# 🚀 Features

- UI Automation using Playwright
- API Automation Layer
- AI-Assisted Failure Analysis
- Self-Healing Locator Strategy
- Intelligent Retry Mechanism
- Parallel Execution
- CI/CD Integration using GitHub Actions
- Rich HTML Reporting
- Dockerized Test Execution


---

# 🏗️ Architecture

```plaintext
Tests
   ↓
Pages / API Clients
   ↓
Utilities / AI Services
   ↓
Reporting / Logs / Insights
```

---

# 🧰 Tech Stack

| Technology | Purpose |
|------------|----------|
| Playwright | UI & API Automation |
| TypeScript | Type Safety |
| GitHub Actions | CI/CD |
| Docker | Containerized Execution |
| OpenAI APIs | AI Features |

---

# 📁 Project Structure

```plaintext
tests/ui          → UI test scenarios
tests/api         → API test scenarios

pages             → Page Object Models
components        → Reusable UI components

api/clients       → API abstraction layer

ai/services       → AI failure analysis
ai/prompts        → AI prompts
ai/clients        → AI integrations

utils             → Common utilities
config            → Environment configs
reports           → Playwright reports
```
---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/SagarWanjari/playwright-ai-automation-platform.git
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

---

# 🔐 Environment Setup

Create a `.env` file in project root:

```env
GROQ_API_KEY=your_key
BASE_URL=https://example.com
```

---

# ▶️ Execution Commands

## Run All Tests

```bash
npx playwright test
```

## Run Smoke Tests

```bash
npx playwright test --grep @smoke
```

## Run API Tests

```bash
npx playwright test tests/api
```

## Run in Headed Mode

```bash
npx playwright test --headed
```

## Run Specific Browser

```bash
npx playwright test --project=chromium
```

---

# 📊 Reporting

Framework supports:

- HTML Reports
- Screenshots on Failure
- Video Recording
- Trace Files
- Execution Logs
- AI Failure Insights

Generate report:

```bash
npx playwright show-report
```

---

# 🤖 AI Capabilities

## AI Failure Analysis

- Analyzes failed tests
- Categorizes failures
- Suggests probable root cause

## Intelligent Insights

- Detects flaky tests
- Highlights unstable modules

---

# 🔄 CI/CD Integration

Integrated with GitHub Actions:

- Automatic execution on push
- Parallel execution
- Artifact uploads
- Failure reporting

Workflow location:

```plaintext
.github/workflows/
```

---

# 🐳 Docker Support

Run framework inside Docker container for consistent execution across environments.

```bash
docker-compose up --build
```

---

# 🔒 Security Practices

- Environment variables managed securely
- API keys excluded from repository
- `.env` added to `.gitignore`

---

# 👨‍💻 Author

SDET-focused intelligent automation framework designed to demonstrate enterprise-grade QA engineering and AI-assisted testing architecture.