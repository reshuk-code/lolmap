# 🌍 LOL MAP — The Reverse GeoGuesser! 🤪

Welcome to **LOL MAP**, a vibrant, fast-paced, and highly addictive Reverse GeoGuesser game! Instead of dropping you somewhere in the world and asking "Where are you?", we give you the name of a place and say **"Find it on the map!"**

Playable right in your browser with a juicy, colorful, casual-game UI (think Candy Crush meets Geography).

![LOL MAP Screenshot](/public/banner.png)

## ✨ Features
- **Reverse GeoGuessing**: We give you a city, landmark, or obscure location. You drop the pin where you think it is!
- **Juicy Casual UI**: Bouncy animations, vibrant gradients, and satisfying 3D buttons.
- **Dynamic Scoring**: The closer your pin is to the actual location, the higher your score. Powered by the Haversine distance formula!
- **Multiple Difficulties**:
  - **Easy**: Famous capitals and global landmarks.
  - **Medium**: Well-known cities and towns.
  - **Hard**: Middle of nowhere. Good luck.
- **Regional Play**: Filter locations by World, Asia, Europe, or the Americas.
- **Label-less Maps**: True challenge! The maps don't have city or country labels to help you cheat.

## 🚀 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Maps**: [Leaflet.js](https://leafletjs.com/) with CartoDB Voyager tiles.
- **Icons**: pure emoji magic ✨
- **Fonts**: [Fredoka](https://fonts.google.com/specimen/Fredoka) and [Quicksand](https://fonts.google.com/specimen/Quicksand)

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js and npm (or pnpm/yarn) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/reshuk-code/lolmap.git
   cd lolmap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser and start guessing!

## 🛣️ Roadmap
- [ ] User Authentication & Profiles (Firebase)
- [ ] Global Leaderboards
- [ ] Play limits for non-logged-in users
- [ ] Multiplayer / Challenge a Friend mode

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📝 License
This project is Open Source. Feel free to use it, learn from it, and make it your own!

---
*Created with ❤️ by reshuk-code.*
