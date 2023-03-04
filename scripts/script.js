function scrapeTitle() {
  const title = document.querySelector(".signup--title-text").textContent;
  return title;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // popup wants to scrape data
  if (request.action === "scrapeData") {
    const scrapedData = scrapeTitle();
    sendResponse({ data: scrapedData });
  }
});
