# Word Game App

A 5-letter word validation game where user:

- Input letters to form words
- Get real-time visual feedback as he type
- Validate complete words by pressing Enter
- Receive instant feedback on whether words are valid dictionary words
- Can backspace to correct mistakes

## Screenshots

![image](screenshots/image.png?raw=true "Image")

## Tech/framework used

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules
- [TanStack Query](https://tanstack.com/query/latest)
- [Vite](https://vite.dev/)

## Features

- Interactive letter input - Click or keyboard input
- Real-time status updates - Visual feedback (empty, correct, incorrect states)
- Dictionary validation - Uses external API to verify real words
- Smart caching - Prevents redundant API calls for previously checked words
- Event-driven architecture - Uses action listeners for input handling
- Responsive design - Works across different input methods

## Installation

**Running Locally**

git, npm and node softwares should be installed before moving on

```bash
git clone https://github.com/dimakol/react-word-game-app.git
cd react-word-game-app
npm install
npm run dev
```

**Building for production**

```bash
npm run build
```

## API Reference

- https://dictionaryapi.dev/ - Free Dictionary API

## Deployed to Github pages

https://dimakol.github.io/react-word-game-app/

## License

(The MIT License)

Copyright © 2025 Dima Kolyas
