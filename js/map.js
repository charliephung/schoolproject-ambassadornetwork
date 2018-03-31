
function initMap(arrCoords) {
	let latlng = new google.maps.LatLng(39.305, -76.617);
	let map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 29.5260,
			lng: 30.2551
		},
		zoom: 2.2,
		styles: [{
			"elementType": "geometry",
			"stylers": [{
				"color": "#f5f5f5"
			}]
		},
		{
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#616161"
			}]
		},
		{
			"elementType": "labels.text.stroke",
			"stylers": [{
				"color": "#f5f5f5"
			}]
		},
		{
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "administrative.land_parcel",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#bdbdbd"
			}]
		},
		{
			"featureType": "poi",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "poi",
			"elementType": "geometry",
			"stylers": [{
				"color": "#eeeeee"
			}]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#757575"
			}]
		},
		{
			"featureType": "poi.park",
			"elementType": "geometry",
			"stylers": [{
				"color": "#e5e5e5"
			}]
		},
		{
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#9e9e9e"
			}]
		},
		{
			"featureType": "road",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "road",
			"elementType": "geometry",
			"stylers": [{
				"color": "#ffffff"
			}]
		},
		{
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#757575"
			}]
		},
		{
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [{
				"color": "#dadada"
			}]
		},
		{
			"featureType": "road.highway",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#616161"
			}]
		},
		{
			"featureType": "road.local",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#9e9e9e"
			}]
		},
		{
			"featureType": "transit",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "transit.line",
			"elementType": "geometry",
			"stylers": [{
				"color": "#e5e5e5"
			}]
		},
		{
			"featureType": "transit.station",
			"elementType": "geometry",
			"stylers": [{
				"color": "#eeeeee"
			}]
		},
		{
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"color": "#c9c9c9"
			}]
		},
		{
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#3c92c5"
			},
			{
				"visibility": "on"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "labels.text",
			"stylers": [{
				"visibility": "off"
			}]
		},
		{
			"featureType": "water",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#9e9e9e"
			}]
		}
		]
	});

	if (arrCoords && arrCoords.length != 0) {
		arrCoords.forEach(ele => {
			addMarker({
				coords: { lat: ele.lat, lng: ele.lng },
				content: ele
			});
		})
	}


	function addMarker(props) {
		let marker = new google.maps.Marker({
			position: props.coords,
			map: map,
		});
		let infoWindow = new google.maps.InfoWindow();
		infowindows.push(infoWindow);
		if (props.content) {
			infoWindow.setContent(`
			<div class="infoWindow"><img src="${props.content.profile}" >
						<p class="infoWindow__name">${props.content.name}</p>
						<p>${props.content.address}</p>
						<p><strong>Area of interest:</strong></p>
						<p>${props.content.interest}</p>
						<p class="infoWindow__email"><strong>${props.content.email}</strong></p>
						${ props.content.post
					? `<p><a class="onPopup" href=${props.content.post}>Meet  ${props.content.name.split(" ")[0]}</a></p></div>`
					: ""}
				`);
			//add infowindow to array
			infoWindow.setPosition(props.coords);

			marker.addListener("click", () => {
				for (let i = 0; i < infowindows.length; i++) {
					infowindows[i].close();
				}

				infoWindow.open(map, marker);
				var gm = document.getElementsByClassName("gm-style-iw");
				// gm[0].removeAttribute("style");
				gm[0].style.width = "250px";
				addEventPopup();

				map.panTo(props.coords)
				smoothZoom(map, 0, map.getZoom());
			});

		}
		// else {
		// 	infoWindow.setContent(`
		// 	<div class="infoWindow"><img src="${props.content.profile}" >
		// 				<p class="infoWindow__name">${props.content.name}</p>
		// 				<p>${props.content.address}</p>
		// 				<p><strong>Area of interest:</strong></p>
		// 				<p>${props.content.interest}</p>
		// 				<p class="infoWindow__email"><strong>${props.content.email}</strong></p>
		// 		`);
		// 	//add infowindow to array
		// 	infoWindow.setPosition(props.coords);

		// 	marker.addListener("click", () => {
		// 		for (let i = 0; i < infowindows.length; i++) {
		// 			infowindows[i].close();
		// 		}

		// 		infoWindow.open(map, marker);
		// 		var gm = document.getElementsByClassName("gm-style-iw");
		// 		// gm[0].removeAttribute("style");
		// 		gm[0].style.width = "250px";
		// 		addEventPopup();

		// 		map.panTo(props.coords)
		// 		smoothZoom(map, 0, map.getZoom());
		// 	});
		// }
	}
	function smoothZoom(map, max, cnt) {
		if (cnt >= max) {
			return;
		}
		else {
			z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
				google.maps.event.removeListener(z);
				smoothZoom(map, max, cnt + 1);
			});
			setTimeout(function () { map.setZoom(cnt) }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
		}
	}



}
var infowindows = [];
geocode();
function geocode() {
	// Get address
	let firebaseData = firebase.database().ref("/data");
	firebaseData.once('value', ss => {
		let values = ss.val();
		let arrCoords = [];
		if (values) {
			Object.keys(values).forEach(ele => {
				if (values[ele].address) {
					let ambassadorsData = values[ele];
					let location = values[ele].address;
					axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
						params: {
							address: location,
							key: 'AIzaSyA_wCL_N-G9W3VV81AsfkSS8NJQ1OFYX4A'
						}
					})
						.then((res) => {
							// Formatted stuff
							let address = res.data.results[0].formatted_address;
							// // Address components
							// let addressComponents = res.data.results[0].address_components;
							// console.log(addressComponents);
							// Geometry
							let lat = res.data.results[0].geometry.location.lat;
							let lng = res.data.results[0].geometry.location.lng;
							let temp = {
								address,
								lat,
								lng,
								profile: ambassadorsData.profile,
								name: ambassadorsData.name,
								email: ambassadorsData.email,
								interest: ambassadorsData.interest,
							};
							if (ambassadorsData.post) {
								temp.post = (ambassadorsData.post[Object.keys(ambassadorsData.post)[0]]) ? Object.keys(ambassadorsData.post)[0] : undefined
							}
							arrCoords.push(temp);

							initMap(arrCoords);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					initMap();
				}
			});
		}
		else {
			initMap();
		}
	});
	// Request
}
