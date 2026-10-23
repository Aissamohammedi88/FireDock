# FireDock
The extension drawer Firefox desperately needs. Group, search, and toggle all your installed extensions from a single, clean popup. Zero bloat, 100% local.
<div align="center">

<!-- Bannière SVG -->
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#151520"/>
    </linearGradient>
    <linearGradient id="foxGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff6b35">
        <animate attributeName="stop-color" values="#ff6b35;#ffaa00;#ff6b35" dur="3s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#ffaa00">
        <animate attributeName="stop-color" values="#ffaa00;#ff6b35;#ffaa00" dur="3s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="800" height="200" fill="url(#bgGrad)" rx="12"/>
  <rect x="1" y="1" width="798" height="198" fill="none" stroke="url(#foxGrad)" stroke-width="2" rx="11" opacity="0.6"/>
  <text x="400" y="95" text-anchor="middle" font-family="ui-monospace, monospace" font-size="46" font-weight="900" fill="url(#foxGrad)" filter="url(#glow)">
    🦊 TIDYFOX
    <animate attributeName="opacity" values="1;0.8;1" dur="2s" repeatCount="indefinite"/>
  </text>
  <text x="400" y="135" text-anchor="middle" font-family="ui-monospace, monospace" font-size="15" fill="#a0a0a0" letter-spacing="3">
    THE FIREFOX EXTENSION DRAWER
  </text>
</svg>

<br/>

[![Firefox](https://img.shields.io/badge/Firefox-109%2B-FF7139?style=for-the-badge&logo=firefox-browser&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-NEXUS--OPEN--3.0-00ff9d?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Open_Source-ffaa00?style=for-the-badge)](#)

<br/>

**Ta barre d'outils Firefox est un bordel ?**
**TidyFox range toutes tes extensions dans un menu propre, cherchable, avec des boutons ON/OFF.**

**[⚡ Installation](#-installation) · [🧠 Pourquoi TidyFox ?](#-pourquoi-tidyfox-) · [🏗️ Architecture](#️-architecture)**

</div>

---

## 😤 Le Problème

Firefox est génial. Mais dès que tu installes plus de 5 extensions, ta barre d'outils devient un vrai dépotoir. Les icônes se chevauchent, tu ne sais plus laquelle fait quoi, et tu passes ton temps à cliquer sur "Personnaliser la barre d'outils" pour faire le tri.

Pire encore : **Mozilla n'a jamais implémenté l'API pour créer des dossiers d'extensions**. C'est une des fonctionnalités les plus demandées sur les forums, mais elle n'existe pas.

## 💡 La Solution : TidyFox

TidyFox contourne cette limitation avec un **menu popup intelligent**.

- **Tout au même endroit :** Oublie les icônes éparpillées. Tu as un seul bouton dans ta barre. Clique dessus, et toutes tes extensions apparaissent dans une liste propre.
- **Recherche instantanée :** Tape le nom d'une extension pour la filtrer en un éclair.
- **Boutons ON/OFF :** Désactive une extension en un clic, sans passer par les paramètres de Firefox.
- **100% Local :** Aucune donnée n'est envoyée à un serveur. Tout se passe dans ton navigateur.
- **Souverain :** C'est open-source, auditable, et ça ne dépend de personne.

---

## ⚡ Installation

### Méthode 1 : Chargement temporaire (Pour tester)

1. Ouvre Firefox et tape `about:debugging` dans la barre d'adresse.
2. Clique sur **"Ce Firefox"** à gauche.
3. Clique sur **"Charger un module temporaire..."**.
4. Sélectionne le fichier `manifest.json` du dossier TidyFox.
5. L'icône TidyFox apparaît dans ta barre d'outils. Clique dessus. 🎉

### Méthode 2 : Installation permanente (Recommandée)

1. Télécharge le fichier `.xpi` depuis les [Releases](https://github.com/Aissamohammedi88/TidyFox/releases).
2. Ouvre Firefox.
3. Tape `about:addons` dans la barre d'adresse.
4. Clique sur l'icône d'engrenage ⚙️ en haut à droite.
5. Sélectionne **"Installer un module complémentaire à partir d'un fichier..."**.
6. Choisis le fichier `.xpi`.

*(Note : Pour que l'installation permanente fonctionne, le fichier `.xpi` doit être signé par Mozilla. Si ce n'est pas le cas, utilise la Méthode 1 ou Firefox Developer Edition).*

---

## 🧠 Pourquoi TidyFox ?

| Fonctionnalité | Barre d'outils Firefox | **TidyFox** |
|----------------|------------------------|-------------|
| Voir toutes ses extensions au même endroit | ❌ Non | **✅ Oui** |
| Rechercher une extension par nom | ❌ Non | **✅ Oui** |
| Activer/Désactiver en 1 clic | ❌ Non | **✅ Oui** |
| Créer des dossiers | ❌ Non (API manquante) | **✅ Oui (via menu)** |
| Souveraineté (pas de cloud) | ✅ Oui | **✅ Oui** |

---

## 🏗️ Architecture

TidyFox est une extension Firefox minimaliste (Manifest V3). Elle utilise deux API natives de Firefox :

1. `browser.management.getAll()` : Récupère la liste de toutes les extensions installées.
2. `browser.management.setEnabled()` : Active ou désactive une extension.

Le code est divisé en trois fichiers :

- `manifest.json` : Déclare les permissions (`management`, `storage`).
- `popup.html` : L'interface utilisateur (le menu qui s'ouvre au clic).
- `popup.js` : La logique (récupération des extensions, rendu, recherche, activation).

---

## 🛠️ Développement

### Prérequis

- Firefox 109+ (Manifest V3)
- Un éditeur de texte (VS Code, Vim, etc.)

### Compiler l'extension

```bash
# Cloner le dépôt
git clone https://github.com/Aissamohammedi88/TidyFox.git
cd TidyFox

# Lancer le script de build
chmod +x build.sh
./build.sh
