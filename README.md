<img width="50" style="vertical-align:middle" alt="logo" src="./assets/icons/logo128.png" />

# IdeaJar

IdeaJar is a sleek, fast vault for your text snippets, email templates, and AI prompts. Capture text directly from any webpage and instantly inject your best ideas right back in. It is designed for users who want to save time typing recurring messages or hunting down lost text.

## Installation

### 1. For Users (The Easy Way)
The easiest way to use IdeaJar is to install it from the official stores:

* [**Chrome Web Store**](link) (still under review)
* [**Firefox Add-ons**](link) (still under review)

    
### 2. For Developers (Run Locally)

**1. Clone the repository:**
```bash
git clone https://github.com/ayoubchwt/IdeaJar.git
```

**2. Load into Chrome:**
1. Switch to the `chrome` branch:
```bash
git checkout chrome
```
2. Open Chrome and navigate to `chrome://extensions/`
3. Toggle on **Developer mode** in the top right corner
4. Click **Load unpacked** in the top left corner
5. Select the cloned IdeaJar folder

**3. Load into Firefox:**
1. Switch to the `firefox` branch:
```bash
git checkout firefox
```
2. Open Firefox and navigate to `about:debugging`
3. Click **This Firefox** on the left sidebar
4. Click **Load Temporary Add-on**
5. Navigate to the cloned folder and select the `manifest.json` file

## Demos

<table>
  <tr>
        <td align="center">
            <img width="300" alt="" src="./assets/demo/context.gif" />
        </td>
        <td align="center">
            <img width="300" alt="" src="./assets/demo/inject.gif" />
        </td>
    </tr>
  <tr>
        <td align="center">
            <img width="300" alt="" src="./assets/demo/backup.gif" /> 
        </td>
            <td align="center">
            <img width="300" alt="" src="./assets/demo/themes.gif" /> 
        </td>
    </tr>
</table>

##  Features

* **Quick Web Capture:** Highlight any text on a webpage, right-click, and instantly save it to your jar.
* **One-Click Injection:** Hit the "Use" button on any saved card to automatically paste text directly into the active browser tab.
* **Smart Organization:** Mark your most-used templates as favorite and find what you need with the built-in search filter.
* **Backup & Restore:** Easily export your entire jar as a backup JSON file or import it to sync across devices.
* **Privacy-First:** 100% local. Your data belongs to you with no accounts, no tracking, and zero subscriptions.
* **Custom Themes:** Match your aesthetic with deeply customized themes, including Gruvbox, Catppuccin, Sun, and Eclipse.

## Tech Stack

* **JavaScript (ES6+)** - Core logic, DOM manipulation, and state management.
* **HTML5 & CSS3** - Structure and styling for the reading mode interface.
* **Chrome & Firefox WebExtensions API** — Used for `storage.local` data persistence, background scripts, context menus, and content scripts for DOM injection.

## Contributing

Since **IdeaJar** is built with Vanilla JS, it's very easy to jump in! You don't need to set up complex build environments, just edit the code and test.

1. **Fork the Project** — click the "Fork" button at the top right of this page.
2. **Create your Feature Branch** — `git checkout -b feature/AmazingFeature`
3. **Make your Changes**
4. **Test Locally** — reload the extension in `chrome://extensions/` or `about:debugging` on Firefox.
5. **Commit your Changes** — `git commit -m 'Add some AmazingFeature'`
6. **Push to the Branch** — `git push origin feature/AmazingFeature`
7. **Open a Pull Request**

### Found a Bug?
If you find a bug or have a feature request, please [open an issue](https://github.com/ayoubchwt/IdeaJar/issues) first to discuss what you would like to change.


# License

Distributed under the MIT License. See `LICENSE` for more information.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
