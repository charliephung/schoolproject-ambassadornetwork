firebase.database().ref("/news").once("value", ss => {
	if (ss.val()) {
		let data = ss.val();
		let newsHeading = document.getElementById("news__heading");
		let newsContent = document.getElementById("news__content");
		let newsFooter = document.getElementById("news__footer");

		newsHeading.innerHTML = data.newsHeader;
		newsContent.innerHTML = data.newsBody;
		newsFooter.innerHTML = data.newsFooter;
	}
})