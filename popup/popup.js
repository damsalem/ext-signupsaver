const button = document.querySelector("#button");
const changeText = document.querySelector("#changeText");
button.addEventListener("click", manageBookmarks);

// TODO: Create function to append bookmarks to popup (consider Alpine.js)
// TODO: Dynamically grab the title of the bookmark from the SUP
// TODO: Turn the icon grayscale when not on a SUG SUP page

function manageBookmarks(event, bookmarkTitle = "SignUp") {
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
		chrome.bookmarks.create({
			title: bookmarkTitle,
			url: "https://www.signupgenius.com/go/10c0f4baca92fa1fac34-test4#/",
			parentId: folderId,
			index: 0,
		});

		toggleChangeText("addition");
	}

	// Toggle ChangeText
	// addition, removal,
	function toggleChangeText(change = "addition") {
		switch (change) {
			case "addition":
				changeText.innerHTML = "Bookmark added";
				break;
			case "removal":
				changeText.innerHTML = "Bookmark removed";
				break;
			default:
				changeText.innerHTML = "Hmmm that didn't work";
		}
		changeText.style.visibility = "visible";

		setTimeout(function hideText() {
			changeText.style.visibility = "hidden";
		}, 2000);
	}
}
