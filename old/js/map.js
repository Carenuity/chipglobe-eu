let popup, Popup;
function initMap() {
    var centerLocation = new google.maps.LatLng(38.907567703283945, 58.72356068653766);
    var mapOptions = {
        zoom: 3,
        mapId: "ea1c604e8f71b8e1",
        //center: centerLocation,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        keyboardShortcuts: false,
        terms: false
      }
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var locations = [
      ['Dresden', 51.10399206734702, 13.772527421404908, "ChipGlobe Design Center (ODC)<br> Königsbrücker Str. 180<br> 01099 Dresden<br> Germany<br>"],
      ['Munich', 48.075637407466054, 11.656584818801797, "Design Center Chipglobe GmbH (ODC) Munich<br> Design Center and Office Address:<br> Professor-Messerschmitt-Strasse 1, 3rd floor<br> 85579 Neubiberg / Munich<br> Germany"],
      ['Serbia', 44.80645899793151, 20.420732590533692, "ChipGlobe d.o.o Beograd (ODC)<br> Milutina Milankovića 11v <br> 11070 Belgrade. Serbia<br> GREEN HEART - Building N3, 5th floor"],
      ['Bulgaria', 42.70425605500023, 23.327420676708872, "ChipGlobe Design Center (ODC)<br> Sofia Bulgeria"],
      ['Greece', 40.63622269409316, 22.935130747266186, "ChipGlobe Design Center (ODC)<br> Karatasou 7<br> 54626 Thessaloniki<br> Greece"],
      ['Vietnam', 10.802015459931713, 106.71590592982899, "ChipGlobe Vietnam Co., Ltd.<br> 36/10 Nguyen Gia Tri<br> Ward 25, Binh Thanh District<br>Ho Chi Minh City<br> Vietnam"],
      ['Singapore', 1.3585147505281208, 103.83363920980734, "ChipGlobe Asia Pacific Pte. Ltd.<br> 22 Sin Ming Lane<br> #06-76 Midview City<br> Singapore 573969"]
    ]
    var i, marker ;
    var infowindow = new google.maps.InfoWindow;
    var bounds = new google.maps.LatLngBounds();
    for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
            title: locations[i][0],
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: {
              url:"image/pin.png",
              scaledSize: new google.maps.Size(25,40)
          },
        });
        bounds.extend(marker.getPosition());
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
              infowindow.setContent(locations[i][3]);
              infowindow.open(map, marker);
          }
     })(marker, i));

     //marker.setMap(map);
    }
    map.fitBounds(bounds);
    google.maps.event.addListener(window, 'load', initMap);
    google.maps.event.addListener(window, 'resize', initMap);
  }
  
  window.initMap = initMap;