# ✅ Contract Tech Bot - Deployment Checklist

Follow these steps in order to deploy your bot to the web!

---

## 📋 Pre-Deployment Checklist

- [ ] I have downloaded all the bot files
- [ ] I have a GitHub account (or will create one)
- [ ] I have Node.js installed (optional - Vercel handles this)
- [ ] I have the Zapier form URL ready

---

## 🚀 Deployment Steps (Choose One Option)

### **OPTION 1: Vercel (Recommended - Easiest) ⭐**

**Time needed: 10 minutes**

#### Step 1: Create GitHub Account
- [ ] Go to https://github.com/signup
- [ ] Sign up with email
- [ ] Verify your email
- [ ] Save your GitHub username

#### Step 2: Create GitHub Repository
- [ ] Go to https://github.com/new
- [ ] Name: `contract-tech-bot`
- [ ] Make it Public
- [ ] Click "Create repository"
- [ ] Copy the HTTPS URL shown

#### Step 3: Upload Files to GitHub
- [ ] Open Terminal/Command Prompt in your bot folder
- [ ] Run these commands one by one:
  ```
  git config --global user.email "YOUR-EMAIL@example.com"
  git config --global user.name "YOUR-NAME"
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin [PASTE-YOUR-GITHUB-URL]
  git push -u origin main
  ```
- [ ] Check GitHub - files should appear there

#### Step 4: Deploy to Vercel
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Click "Import Project"
- [ ] Select `contract-tech-bot` repository
- [ ] Click "Deploy"
- [ ] Wait for "Congratulations" message
- [ ] Copy your live URL

**Result: Your bot is LIVE! 🎉**

#### Step 5: Update Zapier URL
- [ ] Go back to your GitHub repository
- [ ] Click on `contract-tech-bot.jsx`
- [ ] Click the pencil icon to edit
- [ ] Find line with: `window.open('https://cmphdox67000ggoufnt9hjstr.zapier.app/'`
- [ ] Replace with YOUR Zapier form URL
- [ ] Commit changes
- [ ] Wait 30 seconds for Vercel to auto-deploy

**✅ DONE! Your bot is live and ready to use!**

---

### **OPTION 2: Netlify (Also Easy)**

**Time needed: 10 minutes**

#### Step 1-3: Same as Vercel
- Follow Steps 1-3 from Option 1 above

#### Step 4: Deploy to Netlify
- [ ] Go to https://netlify.com
- [ ] Click "New site from Git"
- [ ] Connect to GitHub
- [ ] Select `contract-tech-bot`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `build`
- [ ] Click "Deploy"
- [ ] Get your live URL

#### Step 5: Same as Vercel
- Update Zapier URL same as Step 5 above

**✅ DONE!**

---

### **OPTION 3: GitHub Pages (Free)**

**Time needed: 15 minutes**

#### Step 1-3: Same as above

#### Step 4: Update package.json
- [ ] Edit `package.json`
- [ ] Find: `"name": "contract-tech-bot"`
- [ ] Add below it: `"homepage": "https://YOUR-USERNAME.github.io/contract-tech-bot"`
- [ ] Commit and push

#### Step 5: Deploy
- [ ] In Terminal, run:
  ```
  npm run build
  npm install gh-pages --save-dev
  npx gh-pages -d build
  ```
- [ ] Go to your repo Settings → Pages
- [ ] Select "gh-pages" branch
- [ ] Wait 5 minutes

**✅ Live at: https://YOUR-USERNAME.github.io/contract-tech-bot**

---

## 📱 Testing Your Bot

After deployment:

- [ ] Open your live URL in browser
- [ ] Test by asking a question
- [ ] Try: "How do I create a new contract?"
- [ ] Bot should show knowledge article ✅
- [ ] Click "Report Issue" button
- [ ] Zapier form should open ✅

---

## 🔧 After Deployment

### Update Knowledge Articles
```
1. Go to your GitHub repo
2. Open contract-tech-bot.jsx
3. Edit an article in the knowledgeBase
4. Commit changes
5. Wait 30 seconds for auto-deploy ✅
```

### Add New FAQ
```
1. Open contract-tech-bot.jsx
2. Find: const knowledgeBase = {
3. Add new article:
   'article-name': {
     keywords: ['word1', 'word2'],
     category: 'Category',
     answer: 'Your answer'
   }
4. Commit and push
5. Auto-deploys in 30 seconds ✅
```

### Fix Issues
```
1. Edit files
2. Test locally: npm start
3. git add . && git commit -m "Fixed..." && git push
4. Auto-deployed! ✅
```

---

## ⚠️ Common Issues & Fixes

### "Git not found"
- [ ] Install Git from https://git-scm.com/download
- [ ] Restart Terminal

### "Build failed in Vercel"
- [ ] Check package.json exists in root
- [ ] All files in /outputs folder
- [ ] Check error message in Vercel dashboard

### "My changes aren't showing"
- [ ] Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- [ ] Wait 30 seconds for deploy to complete
- [ ] Check GitHub shows your push

### "Zapier form doesn't open"
- [ ] Verify Zapier URL is correct
- [ ] Test URL in new tab (should open form)
- [ ] Make sure you updated the URL in code

---

## 📊 Verification Checklist

After deployment:

- [ ] Bot loads without errors
- [ ] Can type and send messages
- [ ] Knowledge articles appear with green badge
- [ ] "Report Issue" button visible
- [ ] Clicking "Report Issue" opens Zapier form
- [ ] URL is live and shareable
- [ ] Mobile responsive (test on phone)

---

## 🎓 Next Steps

1. **Share with team**
   - Send them the URL
   - Add to Slack/Teams

2. **Monitor usage**
   - Check what questions users ask
   - Add new FAQs based on questions

3. **Optimize knowledge base**
   - Remove articles people don't use
   - Expand popular topics
   - Fix any inaccurate answers

4. **Gather feedback**
   - Ask team what works/doesn't
   - Improve bot responses
   - Add more articles

---

## 💡 Pro Tips

✅ **Save time**: Vercel auto-deploys on push (no extra steps)

✅ **Test locally first**: `npm start` to test before pushing

✅ **Keep Zapier URL updated**: If you change forms, update the code

✅ **Use meaningful commit messages**: "Updated payment terms FAQ" not "changes"

✅ **Backup your code**: Git acts as backup automatically

---

## 🎉 You're Ready!

Pick one option (we recommend Vercel), follow the steps, and your bot will be live!

**Questions?** 
- Read README.md
- Check DEPLOYMENT-GUIDE.md
- Review the knowledge articles in your bot

**Your bot is about to go live! Good luck! 🚀**
