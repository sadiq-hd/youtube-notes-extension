📒 YouTube Notes Extension

YouTube Notes is a Chrome/Edge extension that allows you to take timestamped notes while watching YouTube videos.
It is built with Angular 18 + TailwindCSS using Manifest V3 APIs.

🚀 Features

✍️ Add notes linked to the current video timestamp.

🕒 Display note time markers and jump directly to that time in the video.

💾 Local Storage support – notes are saved locally, no external servers.

⚡️ Built with Angular 18 + TailwindCSS for a modern UI.

🖥️ Integrated sidebar panel inside YouTube.

🔒 Privacy-friendly: all data stays on your device.

🛠️ Installation (Developer Mode)
1. Clone the repo
git clone https://github.com/your-username/youtube-notes-extension.git
cd youtube-notes-extension

2. Install dependencies
cd angular-app
npm install

3. Build Angular project
npx ng build --output-path ../panel --base-href ./

4. Load the extension in Chrome

Open Chrome → go to chrome://extensions
.

Enable Developer Mode.

Click Load unpacked and select the youtube-notes-extension folder.

The extension will appear in your toolbar.

📂 Project Structure
youtube-notes-extension/
│── manifest.json          # Extension manifest
│── background.js          # Background service worker
│── content.js             # Content script injected into YouTube
│── panel/                 # Compiled Angular app (popup / panel)
│── styles/                # Extra CSS if needed
│── angular-app/           # Angular source code

🖼️ Screenshots

(Add your screenshots here from testing inside YouTube.)

🧩 Tech Stack

Angular 18

Tailwind CSS

TypeScript

Chrome Extensions API (Manifest V3)

📌 Roadmap

🎨 Improve UI/UX with better sidebar design.

☁️ Optional cloud sync (Google Drive / Firebase).

🔍 Search & filter inside notes.

📤 Export notes as PDF or TXT.

👨‍💻 Author

Developed by Sadiq Aldubaisi

🔗 GitHub · 💼 Portfolio · 🌍 Saudi Arabia