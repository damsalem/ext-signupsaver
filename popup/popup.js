const btn = document.querySelector("#btn");
btn.addEventListener("click", showBookmarks);

// TODO: Create function to append bookmarks to popup
// TODO: Dynamically grab the title of the bookmark from the SUP
// TODO: Turn the icon grayscale when not on a SUG SUP page

function showBookmarks(event, bookmarkTitle = "SignUp") {
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
	}
}
