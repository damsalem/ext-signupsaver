window.addEventListener("load", function () {
	const title = document.querySelector(".signup--title-text").textContent;
	console.log(title);
	chrome.runtime.sendMessage(title)
});