# 🚀 CD Pipeline Demo - Video View Battle

A simple, fun project to learn **Continuous Deployment (CD)** in action!

Challenge the legendary **Saxophone Seal** 🦭 with your favorite YouTube video and watch the CI/CD pipeline deploy your changes automatically.

![CI Status](https://img.shields.io/badge/CI-GitHub%20Actions-blue)
![CD Status](https://img.shields.io/badge/CD-Render-purple)

## 🎯 What You'll Learn

- How **Continuous Integration (CI)** validates your code changes
- How **Continuous Deployment (CD)** automatically deploys passing builds
- The complete pipeline from `git push` to live website

## 🏃 Quick Start

### Step 1: Fork & Clone

```bash
# Fork this repo on GitHub, then:
git clone https://github.com/YOUR_USERNAME/CD_Recitation.git
cd CD_Recitation
```

### Step 2: Find Your Favorite YouTube Video

1. Go to YouTube and find a video you love
2. Click "Share" → "Embed" and copy the video ID (or just the URL)
3. Note the video's view count

### Step 3: Edit `script.js`

Open `script.js` and modify these two lines:

```javascript
// BEFORE
const studentVidID = "YOUR_ID_HERE";
const studentViewCount = 0;

// AFTER (any of these formats work!)
const studentVidID = "dQw4w9WgXcQ";                           // Just the ID
const studentVidID = "dQw4w9WgXcQ?si=abc123";                 // ID with tracking param
const studentVidID = "https://youtube.com/embed/dQw4w9WgXcQ"; // Full embed URL
const studentViewCount = 1500000000;  // or use underscores: 1_500_000_000
```

### Step 4: Commit & Push

```bash
git add script.js
git commit -m "Add my favorite video to challenge the seal!"
git push origin main
```

### Step 5: Watch the Magic! ✨

1. **CI Runs**: Go to your repo's "Actions" tab on GitHub
   - Watch the validation workflow run
   - It checks that your video ID is exactly 11 characters
   - It verifies your view count is a valid number

2. **CD Deploys**: If CI passes, Render automatically deploys!
   - Your changes go live within minutes
   - No manual deployment needed!

## 📁 Project Structure

```
CD_Recitation/
├── index.html          # The web page (don't modify)
├── script.js           # ⭐ EDIT THIS FILE
├── validate.js         # CI validation script (don't modify)
├── README.md           # You're reading it!
└── .github/
    └── workflows/
        └── ci.yml      # CI workflow (runs validate.js)
```

## 🔍 CI Validation Rules

The CI pipeline checks:

| Check | Rule | Error if... |
|-------|------|-------------|
| `studentVidID` | Must be exactly 11 characters | ID is wrong length or still "YOUR_ID_HERE" |
| `studentViewCount` | Must be a non-negative integer | Not a number or negative |

## 🛠️ Setting Up Render (For Instructors)

1. Create a new **Static Site** on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.` (root)
4. Enable **Auto-Deploy** on push to main

Render will automatically deploy whenever changes are pushed to the main branch (after CI passes).

## 🎨 Tech Stack

- **HTML5** - Structure
- **Tailwind CSS** - Styling (via CDN)
- **Vanilla JavaScript** - Logic
- **GitHub Actions** - CI
- **Render** - CD & Hosting

## 🦭 About the Saxophone Seal

The legendary seal video has over 2.5 million views! Can your favorite video beat it?

[Watch the Saxophone Seal](https://www.youtube.com/watch?v=G6zPvkP5u6Q)

## 🤔 Troubleshooting

### CI Failed: "Could not extract a valid YouTube ID"
- The system accepts multiple formats:
  - Just the ID: `dQw4w9WgXcQ`
  - With tracking params: `dQw4w9WgXcQ?si=abc123`  
  - Full URLs: `https://youtube.com/watch?v=dQw4w9WgXcQ`
  - Embed URLs: `https://youtube.com/embed/dQw4w9WgXcQ`
- Make sure the video ID portion is exactly 11 characters

### CI Failed: "studentViewCount must be a non-negative integer"
- Use only numbers (no commas or letters)
- Underscores are OK: `1_500_000` or `1500000`

### My changes aren't showing up
- Check GitHub Actions - did CI pass?
- Check Render dashboard - is deployment in progress?
- Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## 📚 Learn More

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Render Documentation](https://render.com/docs)
- [CI/CD Best Practices](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

---

Made with ❤️ for CMU MSSE students
