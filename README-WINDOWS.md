# FileForge for Windows

## Run during development

Install Node.js 20 or newer, then from this folder run:

```powershell
npm install
npm start
```

## Build the Windows app

```powershell
npm run build
```

The finished files will be placed in `dist/`:

- `FileForge Setup 1.0.0.exe` — installable Windows application
- `FileForge-1.0.0-win-*.exe` — portable application

File conversion happens locally inside the app window. PDF.js and jsPDF are packaged into the application, and the interface uses system fonts. The finished installer and portable `.exe` do not need an internet connection at runtime.
