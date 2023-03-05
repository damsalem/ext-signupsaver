const bookmarks = document.querySelector("#bookmarks");
const saveSupButton = document.querySelector("#button");
const changeText = document.querySelector("#changeText");
let bookmarkTitle = "";
let bookmarkUrl = "";

// TODO: Get the popup.html markup state from existing bookmarks
// TODO: Compare the new bookmark with existing to avoid duplicates
// TODO: Turn the icon grayscale when not on a SUG SUP page

saveSupButton.addEventListener("click", handleSaveSup);

function handleSaveSup() {
    // get the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        const tabTitle = activeTab.title;
        const tabUrl = activeTab.url;

        manageBookmarks(tabTitle, tabUrl);
    });
}

function manageBookmarks(title, url) {
    // Search for SignUpSaver Folder
    chrome.bookmarks.search(
        { query: "SignUpSaver", title: "SignUpSaver" },
        function (folder) {
            const folderId = folder[0]?.id;

            // If folder exists, create bookmark
            if (folderId) {
                createBookmark(title, url, folderId);
            } else {
                // Else, create folder
                createSignUpSaverFolder(title, url);
            }
        }
    );

    // Create SignUpSaver Folder
    function createSignUpSaverFolder(title, url) {
        chrome.bookmarks.create(
            {
                title: "SignUpSaver",
            },
            function (folder) {
                // Create first bookmark
                createBookmark(title, url, folder.id);
            }
        );
    }

    // Create SignUpSaver Bookmark
    function createBookmark(title, url, folderId) {
        chrome.bookmarks.create(
            {
                title: title,
                url: url,
                parentId: folderId,
                index: 0,
            },
            function () {
                addToBookmarkList(title);
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
    function addToBookmarkList(title) {
        bookmarks.appendChild(
            Object.assign(document.createElement("li"), {
                innerHTML: title,
            })
        );
    }
}
