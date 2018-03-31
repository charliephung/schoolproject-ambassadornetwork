
// Popup 
let popup = document.getElementById("popup");
let popupPicture = document.getElementById("popup__picture");
let popupHeading = document.getElementById("popup__heading");
let popupContent = document.getElementById("popup__content");
let onPopup = document.getElementsByClassName("onPopup");
let popupClose = document.getElementById("popup__close");
let html = document.getElementsByTagName("html");
const addEventPopup = () => {
	for (let i = 0; i < onPopup.length; i++) {
		onPopup[i].addEventListener("click", (e) => {
			e.preventDefault();
			let id = onPopup[i].getAttribute("href");
			let firebaseData = firebase.database().ref("/post");
			firebaseData.once('value', data => {
				let dataValue = data.val();
				if (dataValue) {
					Object.keys(dataValue).forEach(ele => {
						if (ele === id) {
							popupHeading.innerHTML = dataValue[ele].heading;
							popupContent.innerHTML = dataValue[ele].content;

							popup.style.zIndex = 3000;
							html[0].style.overflow = "hidden";
							setTimeout(() => {
								popup.style.opacity = 1;
							}, 100);
						}
					});
				}
			});
		});
	}
}
popupClose.addEventListener("click", e => {
	popup.style.opacity = -0;
	setTimeout(() => {
		popup.style.zIndex = -1000;
	}, 100);
	html[0].style.overflow = "scroll";
});

// News
let newsHeading = document.getElementById("news__heading");
let newsContent = document.getElementById("news__content");
let newsFooter = document.getElementById("news__footer");
const showNews = (root) => {
	let firebaseData = firebase.database().ref();
	firebaseData.once('value', data => {
		let dataValue = data.val();
		if (dataValue["data"]) {
		}
	});
}