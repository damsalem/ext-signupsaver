const bookmarks = document.querySelector("#bookmarks");
const saveSupButton = document.querySelector("#button");
const changeText = document.querySelector("#changeText");

// TODO: Get the popup.html markup state from existing bookmarks
// TODO: Compare the new bookmark with existing to avoid duplicates
// TODO: Turn the icon grayscale when not on a SUG SUP page

saveSupButton.addEventListener("click", handleSaveSup);

async function handleSaveSup() {
	// Get the current/active tab
	const [activeTab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});

	const activeTabTitle = activeTab.title;
	const activeTabUrl = activeTab.url;

	// Search or create folder
	const folderId = await searchOrCreateSignUpSaverFolder();

	// Create the bookmark
	createBookmark(activeTabTitle, activeTabUrl, folderId);

	// Query bookmarks for matches
	const bookmarkArray = await getSignUpSaverBookmarks(folderId);

	// Update popup unordered list

	// Toggle change text in popup
	toggleChangeText("addition");
}

/****
 *
 * Utility Functions
 *
 ****/

// Search for SignUpSaver folder
async function getSignUpSaverFolderId(
	query = "SignUpSaver",
	title = "SignUpSaver"
) {
	const folder = await chrome.bookmarks.search({ query, title });
	// If folder found, return the id, else return null
	return folder.length > 0 ? folder[0].id : null;
}

// Create SignUpSaver folder
async function createSignUpSaverFolderId(title = "SignUpSaver") {
	const folder = await chrome.bookmarks.create({ title: title });
	return folder.id;
}

// Search for folder, if it doesn't exist, create it
async function searchOrCreateSignUpSaverFolder() {
	let folderId = await getSignUpSaverFolderId();
	if (!folderId) {
		folderId = await createSignUpSaverFolderId();
	}
	return folderId;
}

// Search for bookmarks within the folder
async function getSignUpSaverBookmarks(id) {
	return await chrome.bookmarks.getChildren(id);
}

// Create SignUpSaver bookmark
async function createBookmark(tabTitle, tabUrl, folderId) {
	return await chrome.bookmarks.create({
		title: tabTitle,
		url: tabUrl,
		parentId: folderId,
		index: 0,
	});
}

// Toggle ChangeText
// parameters include: "addition", "removal", and "exists"
function toggleChangeText(change = "addition") {
	switch (change) {
		case "addition":
			changeText.innerHTML = "Bookmark added";
			break;
		case "removal":
			changeText.innerHTML = "Bookmark removed";
			break;
		case "exists":
			changeText.innerHTML = "Bookmark already exists";
			break;
		default:
			changeText.innerHTML = "Hmmm that didn't work";
	}
	changeText.style.visibility = "visible";

	setTimeout(function hideText() {
		changeText.style.visibility = "hidden";
	}, 2000);
}

// Add to Bookmark List
function addToBookmarkList(tabTitleArray) {
	tabTitleArray.forEach((title) => {
		bookmarks.appendChild(
			Object.assign(document.createElement("li"), {
				innerHTML: title,
			})
		);
	});
}
