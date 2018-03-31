let articleDiv = document.getElementById("article");
let articleSubDiv = document.getElementById("article__sub");

const showCardPost = (page) => {
	let spinner = document.getElementById("sk-circle");
	spinner.style.display = "block";
	let articleMain = document.getElementById("article__main");
	let article = ``,
		articleHeading = ``,
		articleDate = ``,
		articleImage = ``,
		articleData;
	let firebaseData = firebase.database().ref();
	firebaseData.once('value', data => {
		let dataValue = data.val();
		if (dataValue["data"]) {
			let arrData = dataValue.data,
				arrPost = [];
			Object.keys(arrData).forEach(id => {
				if (arrData[id].post) {
					Object.keys(arrData[id].post).forEach(idPost => {
						if (arrData[id].post[idPost].status.newsAndEvents === true) {
							arrPost.push({
								heading: arrData[id].post[idPost].heading,
								image: arrData[id].post[idPost].image,
								date: arrData[id].post[idPost].date,
								status: arrData[id].post[idPost].status,
								id: idPost
							});
						}
					});
				}


			});

			// Sort post from newest
			arrPost.sort((a, b) => {
				if (`${a.date.day} ${a.date.time}` === `${b.date.day} ${b.date.time}`) return 0;
				return (`${a.date.day} ${a.date.time}` < `${b.date.day} ${b.date.time}`) ? 1 : -1;
			});
		
			// Adding data to JSX
			if (arrPost.length !== 0) {
				articleHeading = `${arrPost[0].heading}`;
				articleImage = `${arrPost[0].image}`;
				articleDate = `${arrPost[0].date.day} ${arrPost[0].date.time}`;
				article = `
							<img src=${ articleImage} id="big-picture">
							<!-- chen link vao day -->
							<br>
							<div class="word">
								<h2>
									<a href=${ arrPost[0].id} class="onPopup title"> ${articleHeading}</a>
								</h2>
								<!-- time -->
								<p>Posted: ${ articleDate}</p>
								<!-- chen link vao day, cung link -->
								<a href=${arrPost[0].id} class="onPopup link_a">Read more</a>
							</div>`
				// Fill data to html
				articleDiv.innerHTML = article;
				article = ``;
				arrPost.splice(0, 1);

				// Sub post
				let arrSubPost = []
				arrPost.forEach((ele, index) => {
					articleHeading = `${ele.heading}`;
					articleImage = `${ele.image}`;
					articleDate = `${ele.date.day} ${ele.date.time}`;
					article = `
					<div class="col span-1-of-2">
						<div class="article-small">
							<img class="small-picture" src=${articleImage}>
							<div class="word">
								<h4>
									<a href=${ ele.id} class="onPopup title">${articleHeading}</a>
								</h4>
								<!-- time -->
								<p>Posted: ${ articleDate}</p>
								<!-- chen link vao day, cung link -->
								<a href=${ele.id} class="onPopup link_a">Read more</a>
							</div>
						</div>
					</div>
				`;
					arrSubPost.push(article);
				});
				for (let i = 0; i < arrSubPost.length; i++) {
					articleSubDiv.innerHTML += `	
						<div class="row">
						${ arrSubPost[i] ? arrSubPost[i] : ""}
						${ arrSubPost[i + 1] ? arrSubPost[i + 1] : ""} 
						</div>
				`
					i++;
				}
				article = ``;
				// Add event
				addEventPopup();
				spinner.style.display = "none";
				articleMain.style.height = "100%";
				articleDiv.style.display = "block";
				articleSubDiv.style.display = "block";

			}
		}
	});
}

// Display
showCardPost();

