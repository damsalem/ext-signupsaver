const bookmarks = document.querySelector("#bookmarks");
const saveSupButton = document.querySelector("#button");
const changeText = document.querySelector("#changeText");

document.addEventListener("DOMContentLoaded", async function () {
	// Search for existing folder
	let folderId = await getSignUpSaverFolderId();

	if (!folderId) {
		return;
	}
	// Query bookmarks for matches
	const bookmarks = await getAllSignUpSaverBookmarks(folderId);

	//Update popup unordered list
	setupBookmarkList(bookmarks);
});

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
	const { title, url, isExistingBookmark } = await createBookmark(
		activeTabTitle,
		activeTabUrl,
		folderId
	);

	if (!title && !url && isExistingBookmark) {
		// Not a valid page to bookmark
		toggleChangeText("notSug");
		return;
	}

	if (isExistingBookmark) {
		// Bookmark aleady exists
		toggleChangeText("exists");
		return;
	}
	// Update popup unordered list
	addToBookmarkList(title, url);

	// Toggle change text in popup
	toggleChangeText("addition");
}

/****
 *
 * CRUD Functions for Bookmarks
 *
 ****/

// Search for folder, if it doesn't exist, create it
async function searchOrCreateSignUpSaverFolder() {
	let folderId = await getSignUpSaverFolderId();
	if (!folderId) {
		folderId = await createSignUpSaverFolderId();
	}
	return folderId;
}

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

// Search for bookmarks within the folder
async function getAllSignUpSaverBookmarks(id) {
	return await chrome.bookmarks.getChildren(id);
}

// Create SignUpSaver bookmark
async function createBookmark(tabTitle, tabUrl, folderId) {
	let isExistingBookmark = false;
	const query = { title: tabTitle, url: tabUrl };

	if (!tabUrl.match(/.*signupgenius\.com\/go\/.*/i)) {
		isExistingBookmark = true;
		return { title: "", url: "", isExistingBookmark };
	}

	const [existingBookmark] = await chrome.bookmarks.search(query);
	if (existingBookmark && Object.keys(existingBookmark).length !== 0) {
		isExistingBookmark = true;
		return { ...existingBookmark, isExistingBookmark };
	}

	const newBookmark = await chrome.bookmarks.create({
		title: tabTitle,
		url: tabUrl,
		parentId: folderId,
		index: 0,
	});

	return { ...newBookmark, isExistingBookmark };
}

/****
 *
 * Update Popup.html
 *
 ****/

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
		case "notSug":
			changeText.innerHTML = "That doesn't look like a Sign Up!";
			break;
		default:
			changeText.innerHTML = "Hmmm that didn't work";
	}
	changeText.style.visibility = "visible";

	setTimeout(function hideText() {
		changeText.style.visibility = "hidden";
	}, 2000);
}

// Get Relevant Bookmarks and Populate List
function setupBookmarkList(tabTitleArray) {
	tabTitleArray.forEach(({ title, url }) => {
		const link = document.createElement("a");
		link.href = url;
		link.target = "_blank";
		link.innerText = title;

		const li = document.createElement("li");
		li.appendChild(link);

		bookmarks.appendChild(li);
	});
}

// Add Latest Bookmark to List
function addToBookmarkList(title, url) {
	const link = document.createElement("a");
	link.href = url;
	link.target = "_blank";
	link.innerText = title;
	link.className = "bookmark";

	const li = document.createElement("li");
	li.appendChild(link);

	if (bookmarks.firstChild) {
		bookmarks.insertBefore(li, bookmarks.firstChild);
	} else {
		bookmarks.appendChild(li);
	}
}
