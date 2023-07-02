// Função para inicializar o mapa
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -20.4617189, lng: -54.61223709999999},
        zoom: 12,
        mapTypeControl: true,
    });


    map.mapTypeControl = false;

    const locationButton = document.createElement("button");

    locationButton.textContent = "Minha Localização";
    locationButton.classList.add("custom-map-control-button");
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.zoom = 13   ;
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Caso não suporte:
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Erro: Falha em usar a geolocalização."
                : "Erro: Por favor, atualize ou troque seu navegador para se localizar."
        );
        infoWindow.open(map);
    }



    //Dados do Heatmap
    var heatmapData = [
//Centro
        {location: new google.maps.LatLng(-20.4617189, -54.61223709999999), weight: 40},
//Tiradentes
        {location: new google.maps.LatLng(-20.4804084, -54.5711203), weight: Math.random()*100},
//Vila Vilas Boas
        {location: new google.maps.LatLng(-20.4874507, -54.59030560000001), weight: Math.random()*100},
//Pioneiros
        {location: new google.maps.LatLng(-20.5111925, -54.614979), weight: Math.random()*100},
//Aero Rancho
        {location: new google.maps.LatLng(-20.51886, -54.6478885), weight: Math.random()*100},
//Jardim São Conrado
        {location: new google.maps.LatLng(-20.4965941, -54.6792266), weight: Math.random()*100},
//Vila Taveiropolis
        {location: new google.maps.LatLng(-20.4750862, -54.6808111), weight: Math.random()*100},
//Santa Fe
        {location: new google.maps.LatLng(-20.4527743, -54.5900068), weight: Math.random()*100},
//Coronel Antonino
        {location: new google.maps.LatLng(-20.4206427, -54.59030560000001), weight: Math.random()*100},
//São Francisco
        {location: new google.maps.LatLng(-20.4462987, -54.61223709999999), weight: Math.random()*100},
    ];

    console.log(heatmapData);

    // Configurações do heatmap
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
        radius: 20,
        gradient: [
            "rgba(255,255,255,0)",
            "#ff0000",
            "#0000ff",
            "#00ff00",
        ],
    });

    heatmap.setOptions({
        opacity: 0.8,
        dissipating: true,
        maxIntensity: 100,
        radius: 70,
    });

    //Card de pesquisa de cidades
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const options = {
        componentRestrictions: { country: "br" },
        fields: ["address_components", "geometry", "name"],
        strictBounds: false,
        types: ["sublocality"],
    };

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(card);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(locationButton);

    const autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.bindTo("bounds", map);

    const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, 0),
    });

    autocomplete.addListener("place_changed", () => {
        marker.setVisible(true);

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            window.alert("O nome digitado não pôde ser encontrado: '" + place.name + "'");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);

            var text = "Bairro: Centro - Campo Grande\n" +
                "Média: 4\n" +
                "Segurança: 4\n" +
                "Limpeza: 3\n" +
                "Iluminação: 5\n" +
                "Asfalto: 5\n" +
                "Adequado para crianças: 3\n" +
                "Estética: 4\n";

            alert(text);

        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(10);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent =
            place.formatted_address;
        infowindow.open(map, marker);
    });

}

//lembrete: Localização: " + place.geometry.location + "")
//Contém latitude e longitude

window.initMap = initMap;