
# 🦸‍♂️ Dota Hero Explorer

A web application for exploring Dota 2 heroes, utilizing the OpenDota API to fetch and display hero data.

## 🚀 Features

- **Hero Search**: Quickly find heroes by name.
- **Attribute Filtering**: Filter heroes by their primary attribute (Strength, Agility, Intelligence, Universal).
- **Favorites**: Save your favorite heroes (stored in LocalStorage).
- **Detailed View**: Click on a hero card to view detailed information in a modal.
- **Dark/Light Mode**: Toggle between themes.
- **Responsive Grid**: Hero cards are displayed in a responsive grid layout.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- OpenDota API

## 📦 Installation

1. **Clone the repository**
  ```sh
  git clone https://github.com/your-username/your-repo-name.git
  ```
2. **Navigate to the project folder**
  ```sh
  cd Elect_FInal_Projects/Dotae_Api
  ```
3. **Open `index.html` in your web browser**
  - Double-click `index.html` or right-click and select “Open with” > your browser.

## 🖥️ How to Use

1. Open `index.html` in your web browser.
2. Use the search bar to find a specific hero.
3. Click the attribute buttons to filter the list of heroes.
4. Click the "Heart" icon to save a hero to favorites.
5. Click on any hero card to see more details.

## 📄 License

This project is open source and free to use.

## 🙏 Credits

Created by Glenn Mark, December 2025.

---

## 📚 API Reference (OpenDota)

**Base URL:** `https://api.opendota.com/api`

**Endpoints:**
- `/heroStats` — Fetches base stats for all heroes
- `/constants/hero_abilities` — Fetches ability mapping for heroes
- `/constants/abilities` — Fetches detailed ability data

**Required Parameters:**
- None required for these endpoints (fetches all data)

**Authentication:**
- None (OpenDota Free Tier)

**Sample JSON Response (Hero Stats):**
```json
{
  "id": 1,
  "name": "npc_dota_hero_antimage",
  "localized_name": "Anti-Mage",
  "primary_attr": "agi",
  "attack_type": "Melee",
  "roles": ["Carry", "Escape", "Nuker"],
  "img": "/apps/dota2/images/dota_react/heroes/antimage.png?",
  "base_health": 200,
  "base_mana": 75,
  "base_str": 21,
  "base_agi": 24,
  "base_int": 12
}
```
