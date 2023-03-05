const bookmarks = document.querySelector("#bookmarks");
const saveSupButton = document.querySelector("#button");
const changeText = document.querySelector("#changeText");

// TODO: Get the popup.html markup state from existing bookmarks
// TODO: Compare the new bookmark with existing to avoid duplicates
// TODO: Turn the icon grayscale when not on a SUG SUP page

saveSupButton.addEventListener("click", handleSaveSup);

function handleSaveSup() {
    // Get the current/active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        const tabTitle = activeTab.title;
        const tabUrl = activeTab.url;

        manageBookmarks(tabTitle, tabUrl);
    });
}

function manageBookmarks(tabTitle, tabUrl) {
    // Search for SignUpSaver folder
    chrome.bookmarks.search(
        { query: "SignUpSaver", title: "SignUpSaver" },
        function (folder) {
            const folderId = folder[0]?.id;

            // If folder exists, create bookmark
            if (folderId) {
                createBookmark(tabTitle, tabUrl, folderId);
                return;
            }

            // Default, create SignUpSaver folder
            createSignUpSaverFolder(tabTitle, tabUrl);
        }
    );

    // Create SignUpSaver folder
    function createSignUpSaverFolder(tabTitle, tabUrl) {
        chrome.bookmarks.create(
            {
                title: "SignUpSaver",
            },
            function (folder) {
                // Create first bookmark
                createBookmark(tabTitle, tabUrl, folder.id);
            }
        );
    }

    // Create SignUpSaver bookmark
    function createBookmark(tabTitle, tabUrl, folderId) {
        chrome.bookmarks.create(
            {
                title: tabTitle,
                url: tabUrl,
                parentId: folderId,
                index: 0,
            },
            function () {
                addToBookmarkList(tabTitle);
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
    function addToBookmarkList(tabTitle) {
        bookmarks.appendChild(
            Object.assign(document.createElement("li"), {
                innerHTML: tabTitle,
            })
        );
    }
}
