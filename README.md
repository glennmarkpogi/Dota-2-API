# Dota 2 Heroes

A web application for exploring Dota 2 heroes, utilizing the OpenDota API to fetch and display hero data.

## API Documentation

### 1. Base URL
`https://api.opendota.com/api`

### 2. Endpoints
-   **Hero Stats**: `/heroStats` - Fetches base stats for all heroes.
-   **Hero Abilities**: `/constants/hero_abilities` - Fetches ability mapping for heroes.
-   **All Abilities**: `/constants/abilities` - Fetches detailed ability data.

### 3. Required Parameters
-   None required for these endpoints (fetches all data).

### 4. Authentication
-   **Type**: None (OpenDota Free Tier)

### 5. Sample JSON Response (Hero Stats)
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

## Features

-   **Hero Search**: Quickly find heroes by name.
-   **Attribute Filtering**: Filter heroes by their primary attribute (Strength, Agility, Intelligence, Universal).
-   **Favorites**: Save your favorite heroes (stored in LocalStorage).
-   **Detailed View**: Click on a hero card to view detailed information in a modal.
-   **Dark/Light Mode**: Toggle between themes.
-   **Responsive Grid**: Hero cards are displayed in a responsive grid layout.

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript
-   OpenDota API

## How to Use

1.  Open `index.html` in your web browser.
2.  Use the search bar to find a specific hero.
3.  Click the attribute buttons to filter the list of heroes.
4.  Click the "Heart" icon to save a hero to favorites.
5.  Click on any hero card to see more details.

