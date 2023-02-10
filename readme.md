# TL;DR
This chrome extension uses a `manifest.json` as an outline of all pieces, sort of like a `package.json`.

`/popup/` contains the markup and related files to handle everything you see after clicking on the extension button in Chrome.

It also contains `popup.js` which handles the bookmarks
# References Used to Build This Extension

## High Level Overview
https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/

## Chrome Extension Architecture
https://developer.chrome.com/docs/extensions/mv3/architecture-overview/

## Explanation of manifest.json
https://developer.chrome.com/docs/extensions/mv3/manifest/

## Wait Until AngularJS is Loaded
https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState

## Extension That Makes Use of Bookmarks
https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/_archive/mv2/api/bookmarks/basic

### API Reference of chrome.bookmarks
https://developer.chrome.com/docs/extensions/reference/bookmarks/

# Observations

## Displaying Content in Console
* Scripts called by `content_scripts` within `manifest.json` show their content in the browser's console.
* Scripts called within `/popup/popup.js` show their content in the extension's console.

By that same concept, the scope of `content_scripts` is the browser.
Whereas, the scope of `/popup/popup.js` is the extension.