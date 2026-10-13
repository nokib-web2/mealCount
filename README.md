# 🍽️ Meal Tracker Pro - Mobile-First PWA

A modern, mobile-first Progressive Web App (PWA) for managing mess meals, daily meal counts, shared expenses, and member balance statements.

---

## ✨ Features

- 📱 **Mobile-First & Installable PWA**: Install directly onto Android or iOS home screens as a native app with offline capabilities, custom app icon, and standalone display.
- 👥 **Role-Based Access**:
  - **Admin Mode**: Add members, delete members, set daily meals for all, log expenses, customize currency/PIN, and view audit history.
  - **Member Mode**: Secure login using **Name + Mobile Number**. Members view their personal daily meal counts, deposit history, meal rate, and due/collect balance.
- 🔗 **1-Click Credential Sharing**: Admin can share login credentials directly with members via **WhatsApp**, **SMS**, or **Copy to Clipboard**.
- ☁️ **Google Drive as Free Database**: Uses Google Apps Script to save and sync data straight to your personal Google Drive (`meal_tracker_db.json`). Zero server hosting fees!
- ⚡ **Offline First & Auto-Sync**: Automatically saves to local browser storage first and syncs in the background when connected.
- 📊 **Monthly Statement & Reports**:
  - Real-time KPI cards: Total Cost, Total Meals, Meal Rate.
  - One-click **WhatsApp Monthly Summary** generation.
  - Printable / PDF-ready statement receipt.

---

## 🚀 Quick Start (Testing Locally)

To run and test the app on your computer or local network:

1. Open PowerShell or Terminal in this folder:
   ```powershell
   python -m http.server 8080
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```
   *(To test on your mobile phone connected to the same Wi-Fi, open `http://<YOUR_COMPUTER_IP>:8080`)*

---

## ☁️ Google Drive Database Setup (2 Minutes)

To use your own **Google Drive** as the database:

1. Go to [script.google.com](https://script.google.com) and click **"New Project"**.
2. Name the project **"Meal Tracker DB"**.
3. Open the file [`google_drive_backend.gs`](./google_drive_backend.gs) in this folder, copy all code, and paste it into Google Apps Script's `Code.gs` editor (replace any existing template code).
4. Click the blue **Deploy** button at top right $\rightarrow$ select **New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set the deployment settings:
   - **Description**: `Meal Tracker Production`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: allows your mobile app to read & write data)*
7. Click **Deploy**, click **Authorize access**, select your Google account, and click **Allow**.
8. Copy the generated **Web App URL** (ends in `/exec`).
9. In the Meal Tracker app:
   - Go to **Settings** $\rightarrow$ **Google Drive Database**.
   - Paste the URL and click **Save URL**, then click **Test Connection**.
   - Your data is now synced directly to a file named `meal_tracker_db.json` on your Google Drive!

---

## 📲 How to Install on Mobile

### Android (Chrome / Brave / Edge)
1. Open the app link in Google Chrome.
2. Tap the **"Install"** button on the top banner, or tap the three dots menu $\rightarrow$ **"Install app"** or **"Add to Home Screen"**.
3. The app will install with its icon on your phone's home screen.

### iPhone / iPad (Safari)
1. Open the app link in Safari.
2. Tap the **Share** button (the square with an arrow pointing up at the bottom).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **"Add"** in the top right corner.

---

## 🔐 Default Login Details

- **Admin Login**:
  - Admin Name: `Admin`
  - Default PIN: `1234` *(can be changed under Settings)*
- **Member Login**:
  - Log in using the **Name** and **Mobile Number** that the Admin saved.
