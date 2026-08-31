# NutrifyU — Complete Engineering & Deployment Guide

Comprehensive developer guide for **NutrifyU**, covering local environment setup, Android Virtual Device (AVD) management, cloud backend integration, and end-to-end APK generation using EAS Build.

---

## 1. System Architecture Overview

```text
NutrifyU Ecosystem
├── Frontend (Mobile App)
│   └── React Native / Expo
│       ├── Authentication (Login / Signup)
│       ├── Dashboard & Daily Analytics
│       ├── User Profile & Dietary Goals
│       ├── Meal Tracker & History
│       └── AI Food Scanner (Camera Integration)
│
├── Cloud Services & Database
│   └── Firebase
│       ├── Firebase Authentication (User Identity)
│       └── Cloud Firestore (NoSQL Database)
│
├── Backend API Service
│   └── FastAPI (Python)
│       └── Google Gemini API (Vision / Nutrition Analysis Engine)
│
├── CI/CD & Build Infrastructure
│   └── Expo Application Services (EAS Build)
│       └── Cloud APK / AAB Generation
│
└── Source Control
    └── GitHub (github.com/sarthakcodes-hub/NutrifyU)
```

---

## 2. Project Directory & Environment Specs

### Project Paths

| Component | Path / Identifier | Description |
| :--- | :--- | :--- |
| **Backend** | `E:\NutrifyU\food-nutrition-backend` | FastAPI application root |
| **Frontend** | `E:\NutrifyU\food-nutrition-app` | React Native Expo application root |
| **Android SDK** | `C:\Android\Sdk` | Android SDK root |
| **Target AVD** | `NutrifyU_Emulator` | Dedicated Android Virtual Device |
| **System Image** | `system-images;android-35;google_apis;x86_64` | Android 15 API 35 with Google APIs |

### Node & NVM Configuration

Ensure Node.js LTS (v20+) is active before running the frontend:

```powershell
# Verify NVM and activate Node 20 LTS
nvm use 20
node -v    # Expected: v20.x.x
npm -v     # Expected: 10.x.x
```

---

## 3. Local Development Startup

### Terminal 1 — FastAPI Backend

```powershell
cd E:\NutrifyU\food-nutrition-backend

# Start FastAPI server with live-reload enabled
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

> **Note:** Running on `0.0.0.0` allows connections from both the local machine and attached emulators or LAN physical devices.

---

### Terminal 2 — Expo Frontend

```powershell
cd E:\NutrifyU\food-nutrition-app

# Start the Expo Metro bundler
npx expo start
```

---

### Terminal 3 — Android Emulator (AVD)

If the emulator is already configured:

```powershell
& "C:\Android\Sdk\emulator\emulator.exe" -avd NutrifyU_Emulator
```

Once the emulator boots completely, press `a` inside Terminal 2 (Expo) to open the app on Android.

---

## 4. Android Virtual Device (AVD) Lifecycle & Reset

Use this streamlined sequence whenever setting up a new machine or resetting a corrupted emulator.

```powershell
# 1. Delete existing broken emulator (if present)
& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" delete avd -n NutrifyU_Emulator

# 2. Check installed system images
& "C:\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --list_installed

# 3. Create fresh AVD with Android 35 Google APIs (Answer 'no' when prompted for custom hardware profile)
& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" create avd -n NutrifyU_Emulator -k "system-images;android-35;google_apis;x86_64"

# 4. Verify creation in list
& "C:\Android\Sdk\emulator\emulator.exe" -list-avds

# 5. Launch the newly created emulator
& "C:\Android\Sdk\emulator\emulator.exe" -avd NutrifyU_Emulator
```

---

## 5. Production Backend Deployment

Before generating a standalone APK, the local FastAPI backend must be deployed to a publicly accessible HTTPS server so the mobile client can reach the Gemini-powered endpoints.

### 1. Production API Base URL Configuration

Update the mobile app's environment or configuration file:

```typescript
// frontend config / constants
export const API_BASE_URL = "https://your-nutrifyu-api.example.com";
```

### 2. Service Responsibilities Summary

| Service | Primary Role |
| :--- | :--- |
| **GitHub** | Source code hosting and version tracking |
| **Firebase** | User authentication, token verification, and Firestore cloud data |
| **FastAPI + Gemini** | Food image recognition, nutritional parsing, and AI recommendations |
| **Expo EAS** | Cloud-based compilation and APK asset distribution |

---

## 6. Android APK Build with EAS (Expo Application Services)

### Step 1: Install EAS CLI & Authenticate

```powershell
# Install CLI globally
npm install -g eas-cli

# Verify version
eas --version

# Log in to your Expo account
eas login

# Confirm logged in account
eas whoami
```

---

### Step 2: Configure App Package & Project Metadata

In `app.json` (or `app.config.js`), ensure your unique Android package name is configured:

```json
{
  "expo": {
    "name": "NutrifyU",
    "slug": "NutrifyU",
    "version": "1.0.0",
    "android": {
      "package": "com.nutrifyu.app",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
```

Validate the public configuration:

```powershell
npx expo config --type public
```

---

### Step 3: Initialize EAS Configuration

```powershell
eas build:configure
```

Ensure your `eas.json` includes a preview profile configured for direct APK distribution:

```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

---

### Step 4: Trigger Android APK Cloud Build

```powershell
eas build --platform android --profile preview
```

### Step 5: Download & Install APK

When the cloud build process completes successfully, EAS will output a downloadable URL:

```text
✔ Build successful
🔗 Direct APK Download: https://expo.dev/accounts/sarthakcodes/projects/NutrifyU/builds/[build-id]
```

Open this link on your Android device or drag-and-drop the downloaded `.apk` directly into the `NutrifyU_Emulator` window to install.
