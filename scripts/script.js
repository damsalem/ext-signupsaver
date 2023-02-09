document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		initApplication();
	}
};

function initApplication() {
	const sup = document.querySelector(".signupPage");

	if (sup) {
		const title = document.querySelector(".signup--title-text").textContent;

		const badge = document.createElement("h1");
		badge.textContent = `The title of this article is: ${title}`;

		sup.before(badge);
	}
}