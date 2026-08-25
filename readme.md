# NutrifyU — Development & Android Emulator Setup

This document contains the commands used to run the NutrifyU backend, frontend, and Android Virtual Device (AVD).

---

## 1. Backend

### Terminal 1

Open a terminal and move to:

```powershell
E:\NutrifyU\food-nutrition-backend
```

Run:

```powershell
uvicorn main:app --reload --host 0.0.0.0
```

The backend will run using Uvicorn with:

- Auto reload enabled
- Host: `0.0.0.0`

---

## 2. Frontend

### Terminal 2

Open a second terminal and move to:

```powershell
E:\NutrifyU\food-nutrition-app
```

Run:

```powershell
npx expo start
```

This starts the Expo development server for the React Native frontend.

---

# 3. Android Virtual Device (AVD)

The following steps are used to delete the existing NutrifyU emulator and create a completely fresh Android Virtual Device.

## Step 1 — Delete the Existing Emulator

Run:

```powershell
& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" delete avd -n NutrifyU_Emulator
```

---

## Step 2 — Check Existing AVDs

Run:

```powershell
& "C:\Android\Sdk\emulator\emulator.exe" -list-avds
```

Expected result:

```text

```

It should return nothing after the existing `NutrifyU_Emulator` has been deleted.

---

## Step 3 — Check Installed Android System Images

Run:

```powershell
& "C:\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --list_installed
```

Confirm that the required Android system image is installed:

```text
system-images;android-35;google_apis;x86_64
```

---

## Step 4 — Create a Completely Fresh AVD

Run:

```powershell
& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" create avd -n NutrifyU_Emulator -k "system-images;android-35;google_apis;x86_64"
```

When prompted:

```text
Do you wish to create a custom hardware profile? [no]
```

Enter:

```text
no
```

---

## Step 5 — Verify the New AVD

Run:

```powershell
& "C:\Android\Sdk\emulator\emulator.exe" -list-avds
```

Expected result:

```text
NutrifyU_Emulator
```

---

## Step 6 — Start the Fresh Emulator

Run:

```powershell
& "C:\Android\Sdk\emulator\emulator.exe" -avd NutrifyU_Emulator
```

Wait for the Android emulator to finish booting before launching the React Native application.

---

# 4. Recommended Startup Order

For normal development, use the following order.

### Terminal 1 — Backend

```powershell
cd E:\NutrifyU\food-nutrition-backend
uvicorn main:app --reload --host 0.0.0.0
```

### Terminal 2 — Frontend

```powershell
cd E:\NutrifyU\food-nutrition-app
npx expo start
```

### Android Virtual Device — PowerShell

If the emulator already exists:

```powershell
& "C:\Android\Sdk\emulator\emulator.exe" -avd NutrifyU_Emulator
```

Then, after the emulator is fully started, launch the Expo application from the Expo terminal.

---

# 5. Fresh Emulator Reset Procedure

Use the complete reset procedure when the existing emulator is corrupted or behaving incorrectly.

```powershell
& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" delete avd -n NutrifyU_Emulator

& "C:\Android\Sdk\emulator\emulator.exe" -list-avds

& "C:\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --list_installed

& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" create avd -n NutrifyU_Emulator -k "system-images;android-35;google_apis;x86_64"

& "C:\Android\Sdk\emulator\emulator.exe" -list-avds

& "C:\Android\Sdk\emulator\emulator.exe" -avd NutrifyU_Emulator
```

When creating the AVD, answer:

```text
no
```

to the custom hardware profile question.

---

# 6. Project Locations

| Component            | Location                             |
| -------------------- | ------------------------------------ |
| Backend              | `E:\NutrifyU\food-nutrition-backend` |
| Frontend             | `E:\NutrifyU\food-nutrition-app`     |
| Android SDK          | `C:\Android\Sdk`                     |
| AVD                  | `NutrifyU_Emulator`                  |
| Android System Image | `android-35;google_apis;x86_64`      |

---

# 7. Quick Reference

### Backend

```powershell
cd E:\NutrifyU\food-nutrition-backend
uvicorn main:app --reload --host 0.0.0.0
```

### Frontend

```powershell
cd E:\NutrifyU\food-nutrition-app
npx expo start
```

### List AVDs

```powershell
& "C:\Android\Sdk\emulator\emulator.exe" -list-avds
```

### Start AVD

```powershell
& "C:\Android\Sdk\emulator\emulator.exe" -avd NutrifyU_Emulator
```

### Delete AVD

```powershell
& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" delete avd -n NutrifyU_Emulator
```

### Check Installed SDK Packages

```powershell
& "C:\Android\Sdk\cmdline-tools\latest\bin\sdkmanager.bat" --list_installed
```

### Create AVD

```powershell
& "C:\Android\Sdk\cmdline-tools\latest\bin\avdmanager.bat" create avd -n NutrifyU_Emulator -k "system-images;android-35;google_apis;x86_64"
```


PS C:\WINDOWS\System32> nvm version
1.2.2
PS C:\WINDOWS\System32> nvm list

    24.19.0
  * 20.20.2 (Currently using 64-bit executable)
PS C:\WINDOWS\System32> nvm use 20
Now using node v20.20.2 (64-bit)
PS C:\WINDOWS\System32> node -v
v20.20.2
PS C:\WINDOWS\System32> npm -v
10.8.2
PS C:\WINDOWS\System32> npx --version
10.8.2
PS C:\WINDOWS\System32>

