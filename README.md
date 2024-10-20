# Asana Helper

## Overview
Asana Helper is a Chrome extension designed to enhance the user experience of Asana. This extension allows users to customize the visual style of Asana, including darkening the font color of completed items and enabling a dark mode.

## Usage Statistics
![Daily Active Users](/assets/images/DAU.png)
*Current daily active users: 81 (2.65% increase from previous period)*

## Features
1. Darken completed task font color: Improves readability of completed tasks.
2. Dark Mode: Provides a comfortable dark theme for the Asana interface.

## Installation
You can install this extension from the Chrome Web Store:
[Asana Helper - Chrome Web Store](https://chromewebstore.google.com/detail/asana-helper/plhefljdadpkcldpmlaihiaeolncaghj)

## Usage
1. After installing the extension, open Asana in your Chrome browser.
2. Click on the extension icon to open the settings panel.
3. Use the toggles to enable or disable each feature.

## Development
If you want to contribute to or modify this extension, follow these steps:

1. Clone this repository
2. Open `chrome://extensions/` in Chrome
3. Enable "Developer mode"
4. Click "Load unpacked" and select the cloned directory

## Technical Details
- This extension uses Manifest V3.
- Main files:
  - `manifest.json`: Extension configuration
  - `src/browser-actions/index.html`: Popup window HTML
  - `src/browser-actions/index.js`: Popup window script
  - `src/content-scripts/index.js`: Content script
  - `src/content-scripts/index.css`: Stylesheet

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
