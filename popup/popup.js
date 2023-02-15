const bookmarks = document.querySelector("#bookmarks");
const button = document.querySelector("#button");
const changeText = document.querySelector("#changeText");
let bookmarkTitle = "";
let bookmarkUrl = "";

button.addEventListener("click", manageBookmarks);

// Receive Tab Title from Script.js and Stash in Var
chrome.runtime.onMessage.addListener(function (message, tab) {
	console.log("message", message);
	console.log("tab", tab);

	bookmarkUrl = tab.url;
	bookmarkTitle = tab.tab.title !== "" ? tab.tab.title : message;
});

// TODO: Fix popup.js so onMessage.addListener works immediately rather than requiring the extension's inspector be open and then refreshing the page
// TODO: Store the data in the extension or at least grab it from existing bookmarks
// TODO: Compare the new bookmark with existing to avoid duplicates
// TODO: Turn the icon grayscale when not on a SUG SUP page

function manageBookmarks(event) {
	// Search for SignUpSaver Folder
	chrome.bookmarks.search(
		{ query: "SignUpSaver", title: "SignUpSaver" },
		function (folder) {
			const folderId = folder[0]?.id;

			// If folder exists, create bookmark
			if (folderId) {
				createBookmark(folderId);
			} else {
				// Else, create folder
				createSignUpSaverFolder();
			}
		}
	);

	// Create SignUpSaver Folder
	function createSignUpSaverFolder() {
		chrome.bookmarks.create(
			{
				title: "SignUpSaver",
			},
			function (folder) {
				// Create first bookmark
				createBookmark(folder.id);
			}
		);
	}

	// Create SignUpSaver Bookmark
	function createBookmark(folderId) {
		chrome.bookmarks.create(
			{
				title: bookmarkTitle,
				url: bookmarkUrl,
				parentId: folderId,
				index: 0,
			},
			function () {
				addToBookmarkList();
			}
		);

		toggleChangeText("addition");
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
	function addToBookmarkList() {
		bookmarks.appendChild(
			Object.assign(document.createElement("li"), {
				innerHTML: bookmarkTitle,
			})
		);
	}
}
