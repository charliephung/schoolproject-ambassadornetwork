let ambassadorsDiv = document.getElementById("ambassadors");
let articleMain = document.getElementById("article__main");


const showCardPost = (root) => {
	let spinner = document.getElementById("sk-circle");
	spinner.style.display = "block";
	let ambassadorsCard = [];
	let firebaseData = firebase.database().ref();
	firebaseData.once('value', data => {
		let dataValue = data.val();
		if (dataValue["data"]) {
			let arrData = dataValue.data;
			let ambassadors = [];

			Object.keys(arrData).forEach(id => {
				if (arrData[id].ambassador === true) {
					let temp = {
						name: arrData[id].name,
						profile: arrData[id].profile,
						email: arrData[id].email,
					};
					if (arrData[id].post) {
						temp.id = (arrData[id].post[Object.keys(arrData[id].post)[0]]) ? Object.keys(arrData[id].post)[0] : undefined;
					}
					ambassadors.push(temp);
				}
			});
			// Ambassdors
			ambassadors.forEach((ele, index) => {
				article = `
				<div class="col span-1-of-2"> 
					<div class="ambassadors__card">
						<img src=${ ele.profile ? ele.profile : ""}>
						<div class="word">
							<h3>
								<p>${ ele.name}</p>
							</h3>
								<p>
								${ ele.id ?
						`<a href=${ele.id} class="onPopup title">Meet ${ele.name.split(" ")[0]}</a>`
						: ""}
								</p>
							<!-- chen link vao day, cung link -->
							<p><a class="link_a">${ele.email}</a></p>
						</div>
					</div>
				</div>
				`;
				ambassadorsCard.push(article);
			});
			for (let i = 0; i < ambassadorsCard.length; i++) {
				ambassadorsDiv.innerHTML += `	
							<div class="row">
							${ ambassadorsCard[i] ? ambassadorsCard[i] : ""}
							${ ambassadorsCard[i + 1] ? ambassadorsCard[i + 1] : ""} 
							</div>
					`
				i++;
			}
			// 	// Add event
			addEventPopup();
			article = ``;
			articleMain.style.height = "100%";
			spinner.style.display = "none";
		}
		else {
			spinner.style.display = "none";
			articleMain.style.height = "100%";
		}
	});
}

showCardPost();

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
