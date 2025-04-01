Voici un fichier `README.md` complet, qui intègre **tout ce que tu as fait jusqu’ici**, le **contexte pédagogique**, les **spécifications de la Partie 1**, les **étapes d’installation**, et même l'**historique de setup** (issu de ton terminal) :

---

````markdown
# 🃏 Blackjack Svelte

Développement d’un jeu de **Blackjack** en **SvelteKit**, réalisé dans le cadre du **Lab Frontend – RalTech** (YNOV).  
Ce projet utilise une architecture modulaire et une stack moderne pour aboutir à une **librairie de composants réutilisables**.

---

## 🎓 Contexte pédagogique

Ce projet est la **Partie 1 sur 3** d’un laboratoire de développement web.  
Il s'inscrit dans une montée en complexité progressive :

1. **Blackjack (solo)** avec API externe – _sans authentification ni BDD_
2. Ajout de **l’authentification** avec **Lucia**
3. **Persistance des données** avec **Drizzle ORM** et **MySQL**

📄 Références :

- [Deck of Cards API](https://deckofcardsapi.com/)
- [Deck RALTech (serveur local)](https://deckofcards.raltech.school/)

---

## 🚀 Stack & outils utilisés

- **SvelteKit** (template `svelte-library` via `npx sv create`)
- **TypeScript**
- **TailwindCSS** (avec `typography`, `forms`)
- **Vitest** pour les tests unitaires
- **Playwright** pour les tests end-to-end
- **Lucia Auth** (préparé pour la partie 2)
- **Drizzle ORM + MySQL + Docker** (préparé pour la partie 3)
- **Paraglide i18n** (en, fr, es)
- **Storybook 8.6** (auto-doc + test)
- **ESLint**, **Prettier**, **mdsvex**

---

## 📦 Setup du projet (terminal)

```bash
# Création du projet
npx sv create .

# Template choisi : Svelte Library
# Ajouts : tailwindcss, prettier, eslint, vitest, playwright, drizzle, lucia, mdsvex, paraglide, storybook
# Plugins Tailwind : typography, forms
# Adapter SvelteKit : auto
# Drizzle : MySQL + client mysql2 + Docker local
# Langues i18n : en, es, fr
# Storybook : installé avec support test + coverage vitest + playwright
```
````

---

## 🎮 Fonctionnalités attendues (Partie 1 - Blackjack)

- 🎴 Intégration de l’API Deck of Cards :
  - Créer et mélanger un deck
  - Distribuer 2 cartes au joueur et 2 au croupier (1 face cachée)
  - Tirer une carte (Hit) ou s’arrêter (Stand)
- 📏 Règles du Blackjack :
  - Le croupier tire jusqu’à avoir au moins 17
  - Valeurs : Figures = 10, As = 1 ou 11
  - Blackjack = 21 dès la 1ère main
  - Détection du Bust (> 21)
  - Comparaison des scores
- 🖼️ Interface :
  - Affichage des mains et scores
  - Rendu visuel avec les **images des cartes**
  - Boutons interactifs : Hit, Stand, New Game
  - Animations/transitions légères
  - Affichage du statut : "Blackjack", "Bust", "Gagné", "Perdu", "Égalité", etc.

---

## 🧠 Bonnes pratiques attendues

- Composants **découplés** et **réutilisables**
- Architecture **modulaire**
- Utilisation de **TailwindCSS**
- Gestion des erreurs API (fetch/axios)
- **Tests** unitaires (Vitest) et E2E (Playwright)
- Documentation des composants dans **Storybook**

---

## 📁 Structure du projet

```
├── src/
│   ├── lib/             → Composants Svelte réutilisables
│   ├── lib/api/         → Fonctions d'appel à l’API Deck
│   ├── routes/          → App de démonstration (game, home, etc.)
│   └── lib/stores/      → Stores Svelte (état du jeu)
├── .storybook/          → Config Storybook + vitest.setup.ts
├── drizzle/             → Schema et migration Drizzle (MySQL)
├── public/              → Cartes ou assets éventuels
├── README.md            → Ce fichier 😄
```

---

## 🛠️ Démarrer le projet

```bash
npm install
npm run dev -- --open
```

### 🧪 Lancer les tests

```bash
# Tests unitaires
npm run test

# Tests E2E (Playwright)
npm run test:e2e
```

### 📚 Storybook

```bash
npm run storybook
```

---

## 📤 Construction & publication

```bash
# Pour builder la librairie
npm run package

# Build app de démonstration
npm run build
npm run preview

# Publication NPM (modifier le "name" dans package.json)
npm publish
```

---

## 📋 Instructions supplémentaires

### Drizzle (ORM)

```bash
# Lancer la BDD locale via Docker
npm run db:start

# Mettre à jour le schéma
npm run db:push
```

### Paraglide (i18n)

- Fichiers dans `messages/en.json`, `fr.json`, `es.json`
- Utiliser `/demo/paraglide` pour tester

---

## 📜 License

[MIT](./LICENSE)

---

## 👨‍💻 Auteur

**Lucas Madjinda**  
**Junior Chimene**
3ème année Bachelor Ynov  
📧 [Lucas Madjinda](mailto:lucasmadjinda@gmail.com)
📧 [Junior Chimene](mailto:cammonp@outlook.fr)

---

## 📎 Références utiles

- [Deck of Cards API](https://deckofcardsapi.com/)
- [API RALTech](https://deckofcards.raltech.school/)
- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [Storybook](https://storybook.js.org/)

```

```
