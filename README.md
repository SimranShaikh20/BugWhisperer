# 🐛 BugWhisperer
### AI-Powered GitHub Issue Command Center

<div align="center">

![BugWhisperer](https://img.shields.io/badge/BugWhisperer-AI%20Issue%20Analyzer-blue?style=for-the-badge&logo=github)
![Groq AI](https://img.shields.io/badge/Groq-Llama%203.1-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-TanStack-61DAFB?style=for-the-badge&logo=react)
![Cloudflare](https://img.shields.io/badge/Deployed-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Paste any GitHub repo URL → Get instant AI-powered issue triage, priority kanban board, and sprint planning in seconds.**

[🚀 Live Demo](https://bugwhisperer.msusimran20.workers.dev) · [📖 Read the Story](YOUR_DEVTO_POST_URL) · [🐛 Report Bug](https://github.com/SimranShaikh20/BugWhisperer/issues)

</div>

---

## 🎯 What Is BugWhisperer?

BugWhisperer is an AI-powered GitHub issue analyzer that helps developers and teams instantly understand, prioritize, and plan around their open GitHub issues.

Instead of manually reading through dozens of issues trying to figure out what to fix first, BugWhisperer does it for you in seconds using Groq's blazing-fast Llama 3.1 AI.

---

## ✨ Features

### 🔍 Instant AI Issue Analysis
Paste any public GitHub repo URL and get AI analysis of every open issue:
- **Root Cause** — What is likely causing this issue
- **Suggested Fix** — Concrete, actionable solution in plain English
- **Complexity Rating** — Low / Medium / High
- **Priority Rating** — Low / Medium / High / Critical

### 📋 Kanban Priority Board
Issues are automatically sorted into a visual 4-column priority board:

| 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low |
|---|---|---|---|
| Fix immediately | This sprint | Next sprint | Backlog |

### 🗓️ AI Sprint Planner
One click generates a complete 2-week sprint plan with:
- Time estimates per issue (in hours)
- Recommended team size
- Week 1 and Week 2 breakdown
- Backlog items for later

### 📤 Export to Markdown
Export the complete analysis as a `.md` file — ready to paste into your GitHub Wiki, Notion, Linear, or team docs.

### 💬 Post Analysis to GitHub
Post the AI analysis directly as a formatted comment on any GitHub issue — closing the loop from analysis to action without leaving the app.

---

## 📸 Screenshots

### The App
> Paste a GitHub repo URL → Click Analyze Issues → Get instant AI triage

### Before vs After
**Before (September 2025 — The Abandoned Script):**
```python
def analyze_issue(issue):
    # wanted to use openai here but ran out of time
    pass

def main():
    repo = "facebook/react"  # hardcoded lol
    get_issues(repo)
    print("done?")
```

**After (June 2026 — Full AI Command Center):**
- ✅ Full React web application deployed on Cloudflare Workers
- ✅ Analyzes any public GitHub repo instantly
- ✅ Kanban board sorted by AI priority
- ✅ 2-week sprint planner
- ✅ One-click markdown export
- ✅ Post analysis back to GitHub
- ✅ 100% free to use

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React + TanStack + Tailwind CSS | Fast, modern, type-safe |
| Backend | Cloudflare Workers | Serverless, globally distributed, free |
| AI Model | Groq API — `llama-3.1-8b-instant` | Fastest inference, free tier |
| GitHub Data | GitHub REST API v3 | Official, reliable, free |
| Build Tool | Vite + Bun | Extremely fast builds |
| Hosting | Cloudflare Workers | Free, global CDN |

---

## 🚀 Getting Started

### Prerequisites
- [Groq API Key](https://console.groq.com) — Free, 14,400 requests/day
- [GitHub Personal Access Token](https://github.com/settings/tokens) — Free, needed for public repos

### Clone and Run Locally

```bash
# Clone the repo
git clone https://github.com/SimranShaikh20/BugWhisperer.git
cd BugWhisperer

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Add Your API Keys
Edit `.env` file:
```env
GITHUB_TOKEN=ghp_your_github_token_here
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### Run Development Server
```bash
npm run dev
```

Open `http://localhost:5173` and start analyzing!

### Deploy to Cloudflare Workers
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Add secrets
wrangler secret put GITHUB_TOKEN
wrangler secret put GROQ_API_KEY

# Deploy
npm run deploy
```

---

## 💡 How It Works

```
1. User pastes GitHub repo URL
           ↓
2. Cloudflare Worker fetches all open issues
   via GitHub REST API (authenticated)
           ↓
3. Each issue sent to Groq API (Llama 3.1)
   with structured analysis prompt
           ↓
4. AI returns for each issue:
   - root_cause
   - suggested_fix
   - complexity (Low/Medium/High)
   - priority (Low/Medium/High/Critical)
           ↓
5. React frontend renders issues in
   Kanban board sorted by priority
           ↓
6. Optional: Generate AI Sprint Plan
   Optional: Export as Markdown
   Optional: Post to GitHub as comment
```

---

## 📊 API Usage and Costs

| Service | Free Tier Limit | BugWhisperer Usage |
|---|---|---|
| Groq API | 14,400 requests/day | ~5-10 per analysis |
| GitHub API | 5,000 requests/hour | ~1 per repo |
| Cloudflare Workers | 100,000 requests/day | 1 per user visit |

**Total cost to run: $0.00**
Everything used is on a free tier.

---

## 🗺️ Roadmap

- [ ] Support for private repos (user provides their own token)
- [ ] GitHub Actions integration — auto-analyze on new issues
- [ ] Slack notifications for critical issues
- [ ] Multi-repo comparison dashboard
- [ ] VS Code extension
- [ ] Team collaboration mode with shared boards

---

## 🤝 Contributing

Contributions are welcome! Here is how:

1. Fork the repo
2. Create your feature branch
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes
```bash
git commit -m "Add: your feature description"
```
4. Push to your branch
```bash
git push origin feature/your-feature-name
```
5. Open a Pull Request

---

## 🏆 Challenge Submission

This project was built for the **[GitHub Finish-Up-A-Thon Challenge](https://dev.to/challenges/github-finish-up-a-thon)** on DEV.to.

The original broken script was started in September 2025 and abandoned after failing to get the AI integration working. Eight months later, this challenge motivated me to finally finish it — with the help of **GitHub Copilot** which helped me bridge every technical gap I had hit before.

Read the full story on DEV.to: [YOUR_DEVTO_POST_URL]

---

## 📄 License

MIT License — use it freely, build on it, ship it.

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) — blazing fast free AI inference
- [GitHub](https://github.com) — REST API that powers everything
- [Lovable](https://lovable.dev) — where the app was built
- [Cloudflare Workers](https://workers.cloudflare.com) — free global deployment
- [GitHub Copilot](https://github.com/features/copilot) — helped me finally finish this

---

<div align="center">
  Built with ❤️ for the GitHub Finish-Up-A-Thon Challenge 2026
  <br><br>
  <a href="https://bugwhisperer.msusimran20.workers.dev">🚀 Live Demo</a> ·
  <a href="YOUR_DEVTO_POST_URL">📖 Read the Story</a> ·
  <a href="https://github.com/SimranShaikh20/BugWhisperer/issues">🐛 Report Bug</a>
</div>