# 🐛 BugWhisperer
### AI-Powered GitHub Issue Command Center

![BugWhisperer Banner](https://img.shields.io/badge/BugWhisperer-AI%20Issue%20Analyzer-blue?style=for-the-badge&logo=github)
![Groq AI](https://img.shields.io/badge/Groq-Llama%203.1-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-Lovable-61DAFB?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> Paste any GitHub repo URL → Get AI-powered issue triage, sprint planning, and a full priority Kanban board in seconds.

---

## 🚀 Live Demo

👉 **[Try BugWhisperer Live](your-lovable-app-url-here)**

Test it with:
- `https://github.com/fastapi/fastapi`
- `https://github.com/requests/requests`
- `https://github.com/psf/black`

---

## 📸 Screenshots

### Before — The Abandoned Script (September 2025)
```python
import requests

# TODO: fix this later
GITHUB_TOKEN = "put_your_token_here"

def get_issues(repo):
    # this doesnt work properly
    url = f"https://api.github.com/repos/{repo}/issues"
    r = requests.get(url)
    print(r)  # just printing for now

def analyze_issue(issue):
    # wanted to use openai here but ran out of time
    pass

def main():
    repo = "facebook/react"  # hardcoded lol
    get_issues(repo)
    print("done?")

main()
```

### After — Full AI Issue Command Center
- ✅ Kanban Priority Board (Critical / High / Medium / Low)
- ✅ AI Root Cause Analysis for every issue
- ✅ Suggested Code Fixes
- ✅ 2-Week AI Sprint Planner
- ✅ One-Click Markdown Export
- ✅ Post Analysis back to GitHub

---

## ✨ Features

### 🎯 Instant Issue Analysis
Paste any public GitHub repo URL and get AI analysis of all open issues in seconds. Each issue gets:
- **Root Cause** — What is likely causing this issue
- **Suggested Fix** — Concrete, actionable solution
- **Complexity** — Low / Medium / High
- **Priority** — Low / Medium / High / Critical

### 📋 Kanban Priority Board
Issues are automatically sorted into a 4-column priority board so your team can see at a glance what needs attention first.

| 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low |
|---|---|---|---|
| Fix immediately | This sprint | Next sprint | Backlog |

### 🗓️ AI Sprint Planner
Click "Generate Sprint Plan" to get a full 2-week sprint plan with:
- Time estimates per issue
- Recommended team size
- Week 1 and Week 2 breakdown
- Backlog items

### 📤 Export to Markdown
One click exports a complete analysis report as a `.md` file — ready to paste into your GitHub Wiki, Notion, or team docs.

### 💬 Post to GitHub
Post the AI analysis directly as a comment on any GitHub issue — closes the loop from analysis to action without leaving the app.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Tailwind CSS (via Lovable) |
| AI Model | Groq API — `llama-3.1-8b-instant` (free tier) |
| GitHub Data | GitHub REST API v3 |
| Hosting | Lovable built-in hosting |

---

## 🔧 Getting Started

### Prerequisites
- [Groq API Key](https://console.groq.com) — Free, 14,400 requests/day
- [GitHub Personal Access Token](https://github.com/settings/tokens) — Free, for public repos

### Environment Variables
```env
GROQ_API_KEY=your_groq_api_key_here
VITE_GITHUB_TOKEN=your_github_token_here
```

### Run Locally
```bash
# Clone the repo
git clone https://github.com/SimranShaikh20/bugwhisperer

# Install dependencies
npm install

# Add your environment variables
cp .env.example .env
# Edit .env with your keys

# Start development server
npm run dev
```

---

## 💡 How It Works

```
User pastes GitHub repo URL
        ↓
GitHub REST API fetches all open issues
        ↓
Each issue sent to Groq (Llama 3.1) for analysis
        ↓
AI returns: root_cause, suggested_fix, 
            complexity, priority
        ↓
Issues sorted into Kanban board by priority
        ↓
Optional: Generate Sprint Plan
Optional: Export as Markdown
Optional: Post analysis back to GitHub
```

---

## 📊 API Usage & Costs

| Service | Free Tier | BugWhisperer Usage |
|---|---|---|
| Groq API | 14,400 requests/day | ~5 requests per analysis |
| GitHub API | 5,000 requests/hour (authenticated) | ~1 request per repo |

**Cost to run: $0.00** — Both APIs used are completely free.

---

## 🗺️ Roadmap

- [ ] Support private repos (with user's own token)
- [ ] GitHub Actions integration
- [ ] Slack notification when sprint plan is generated
- [ ] Multiple repo comparison
- [ ] Team collaboration mode
- [ ] VS Code extension

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) for the blazing fast free AI inference
- [GitHub](https://github.com) for the REST API
- [Lovable](https://lovable.dev) for making full-stack React development instant
- [GitHub Copilot](https://github.com/features/copilot) for helping me finally finish this

---

