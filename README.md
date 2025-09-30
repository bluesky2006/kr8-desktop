# 🖥️ kr8-desktop

**kr8-desktop** is the Electron-based companion app in the kr8 ecosystem — a virtual record bag for DJs and vinyl lovers. This desktop tool parses playlists from m3u files, extracts rich track metadata, and prepares it for seamless browsing in the `kr8-mobile` app.

Built with **Electron**, **Vite** and **React**, it provides a clean interface for uploading, editing and managing playlists and artwork locally — with planned cloud sync to follow.

---

## 🚀 Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app in development**

   ```bash
   npm run start
   ```

---

## 🧠 Features

- 📂 Drag-and-drop `.m3u` playlists
- 🔎 Auto-extracts metadata: title, artist, BPM, length, artwork
- 🎨 Renders album artwork
- 🖊️ Editable playlist titles
- 🎛️ Clean UI with track cards
- ☁️ Planned cloud sync to Supabase for mobile access

---

## 🗂️ File Structure

```
kr8-desktop/
├── src/
│   ├── components/         # Reusable UI components
│   ├── renderer/           # React app entrypoint and layout
│   ├── utils/              # Metadata parsers and formatters
│   ├── preload.js          # Electron preload script
│   ├── main.js             # Electron main process
├── index.html              # Vite index page
├── forge.config.js         # Electron Forge config
├── tailwind.config.js      # Tailwind setup
├── package.json            # Scripts and dependencies
```

---

## 🛣️ Roadmap

- [ ] ☁️ Sync to Supabase backend
- [ ] 🔀 Track reordering

---

## 🧰 Tech Stack

- [Electron](https://www.electronjs.org/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Electron Forge](https://www.electronforge.io/)
