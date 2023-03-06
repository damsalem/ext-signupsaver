// Toggle URL from grayscale to color based on URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// Check if the URL matches your desired pattern
	const urlMatchesPattern =
		tab.url && tab.url.match(/.*signupgenius\.com\/go\/.*/i);

	// Update the extension icon based on the URL matching the pattern
	const iconPath = urlMatchesPattern
		? "logo-16-enabled.png"
		: "logo-16-disabled.png";
	chrome.action.setIcon({ path: iconPath, tabId: tabId });
});
