# SignUpSaver

A Chrome extension to save Sign Ups from [SignUpGenius.com](https://www.signupgenius.com/)

Install the app and try it out on the [Chrome Web Store](https://chrome.google.com/webstore/detail/signupsaver/ibbajpbnilbagkgamelfmjnpapadkagm)

# Coding

## TL;DR

This chrome extension uses a `manifest.json` as an outline of all pieces, sort of like a `package.json`.

`/popup/` contains the markup and related files to handle everything you see after clicking on the extension button in Chrome.
It also contains `popup.js` which handles the bookmarks

## Observations

### Debugging Errors

To update a Chrome extension under development, you must not only hit the reload button for the extension, but also reload the browser tab else errors will likely persist

### Accessing Console from Extensions Page

Add a `background.js` file and call it as a service worker in the manifest.json

### Gathering Tab Info

Rather than scraping the title from a tab using the `content_scripts`, we can simply grab that data from the active tab using the `chrome.tabs` APIs.

### Sharing Information

There are 3 contexts or environments for Chrome extensions

1. There's the context of the window that appears when you click on an extension, that is the `popup` context.
2. Then there's `content_scripts` their context is the browser.
3. Lastly, there's the context of the `service_worker` which run in the background of the browser, even when the extension is not actively running.

Each have their own console.

- The `popup` console is displayed by right-clicking on popup and clicking on "Inspect".
- The `content_scripts` console is displayed in the browser's console.
- The `service_worker` console is displayed by clicking on "service worker" or "background page" on the Chrome extensions page

Each can communicate with each other using various APIs, see **Sending Data Between Chrome Ext Scripts**

## References Used to Build This Extension

### High Level Overview

https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/

### Chrome Extension Architecture

https://developer.chrome.com/docs/extensions/mv3/architecture-overview/

### Explanation of manifest.json

https://developer.chrome.com/docs/extensions/mv3/manifest/

### Wait Until AngularJS is Loaded

https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState

### Extension That Makes Use of Bookmarks

https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/_archive/mv2/api/bookmarks/basic

#### API Reference of chrome.bookmarks

https://developer.chrome.com/docs/extensions/reference/bookmarks/

### Sending Data Between Chrome Ext Scripts

https://plainenglish.io/blog/how-to-send-data-between-chrome-extension-scripts-1182ce67b659
https://developer.chrome.com/docs/extensions/mv3/messaging/
