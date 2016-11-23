// //import jQuery
// var scriptJquery = document.createElement('script');
// scriptJquery.src = 'https://code.jquery.com/jquery-3.1.1.slim.min.js';
// scriptJquery.integrity = 'sha256-/SIrNqv8h6QGKDuNoLGA4iret+kyesCkHGzVUUV0shc=';
// scriptJquery.crossorigin="anonymous";
// document.getElementsByTagName('head')[0].appendChild(scriptJquery);

//import googleMap
var scriptMap = document.createElement('script');
scriptMap.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAc7Sjig7DD-_u3_-xU_UY6g1VkqI503_U&language=zh-TW&callback=initMap';
document.getElementsByTagName('head')[0].appendChild(scriptMap);

var scriptFunction = document.createElement('script');
scriptFunction.src = 'twd97_to_latlng.js';
document.getElementsByTagName('head')[0].appendChild(scriptFunction);

var map, centerPosition;
$(function(){
});

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      centerPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      _initMap();
    });
  } 
  else {
    centerPosition = {lat: -34.397, lng: 150.644};
    _initMap();
  }
}

function _initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: centerPosition.lat, lng: centerPosition.lng},
    zoom: 14
  });
}

function setParkingPosition(){
  $.ajax({
    url:'http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000225-002',
    dataType: 'json',
    success: function(data){
      if (data.success){
        $.each(data.result.records, function(index, item){
          var marker = new google.maps.Marker({
            position: twd97_to_latlng(item.TW97X, item.TW97Y),
            map: map,
            title: item.NAME
          });
        });
      }
    }
  });
}
