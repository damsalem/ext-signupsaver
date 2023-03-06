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

## Sending Data Between Chrome Ext Scripts

https://plainenglish.io/blog/how-to-send-data-between-chrome-extension-scripts-1182ce67b659

# Observations

## Debugging Errors

To update a Chrome extension under development, you must not only hit the reload button for the extension, but also reload the browser tab else errors will likely persist

## Accessing Console from Extensions Page

Add a `background.js` file and call it as a service worker in the manifest.json

## Gathering Tab Info

Rather than scraping the title from a tab using the `content_scripts`, we can simply grab that data from the active tab using the `chrome.tabs` APIs.

## Sharing Information

The following are two separate environments:

- Scripts called by `content_scripts` within `manifest.json` show their content in the browser's console.
- Scripts called within `/popup/popup.js` show their content in the extension's console.

By that same concept, the scope of `content_scripts` is the browser.
Whereas, the scope of `/popup/popup.js` is the extension.

To connect these environments, we will use Chrome's Tabs and Runtime API.

1. In `popup.js`, we will run `chrome.tabs.query` to get the active (current) tab.
2. Then we will run `chrome.tabs.sendMessage` to send the current tab data to the content script `script.js`
3. In `script.js`, we will listen for the message using the `chrome.runtime` API to listen for the message from `popup.js`.
4. Once the message is received, we will scrape the data from the page and pass that in a response back to `popup.js`
5. `popup.js` will take that response and run it through its methods to build a bookmark
