let latitude;
let longitude;
let myLatLng;

function showPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(currentPosition);
    } else{
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

function currentPosition(position){
  latitude = position.coords.latitude;
  longitude =  position.coords.longitude;
  let positionInfo = "Your current position is (" + "Latitude: " + latitude + ", " + "Longitude: " + longitude + ")";
  document.getElementById("result").innerHTML = positionInfo;
  myMap();
}

function myMap() {
  myLatLng = {lat: latitude, lng: longitude};

  
	let map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 12,
          center: myLatLng
        });


	let marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'My Location!',
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(100, 100)
        });

  let types = ['bus_station', 'train_station', 'hospital', 'shopping_mall', 'movie_theater', 'taxi_stand'];
  let typeIndex;
	var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  for(typeIndex=0; typeIndex<types.length; typeIndex++) {
    place = {
    location: myLatLng,
    radius: 5000,
    type: types[typeIndex]
  }
  service.nearbySearch(place, callback);
}
  
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  var url = 'http://maps.google.com/mapfiles/ms/icons/';
  var images = ['bus.png', 'rail.png', 'hospitals.png', 'shopping.png', 'movies.png', 'cabs.png'];
      
  function createMarker(place) {
     if (place.types[0] == 'bus_station') {
      image = url+images[0];
    }
    else if (place.types[0] == 'train_station'){
      image = url+images[1];
    }
    else if (place.types[0] == 'hospital'){
      image = url+images[2];
    }
    else if (place.types[0] == 'shopping_mall'){
      image = url+images[3];
    }
    else if (place.types[0] == 'movie_theater'){
      image = url+images[4];
    }
    else if (place.types[0] == 'taxi_stand'){
      image = url+images[5];
    }
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }      
}

window.onload = function() {
  showPosition();
  currentPosition(position);
}