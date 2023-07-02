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


    var media = function(){
        var seguranca = Math.ceil(Math.random() * 5 * 10) / 10;
        var limpeza = Math.ceil(Math.random() * 5 * 10) / 10;
        var iluminacao = Math.ceil(Math.random() * 5 * 10) / 10;;
        var asfalto = Math.ceil(Math.random() * 5 * 10) / 10;;
        var crianca = Math.ceil(Math.random() * 5 * 10) / 10;;
        var estetica = Math.ceil(Math.random() * 5 * 10) / 10;;
        var mediaarred = Math.ceil((seguranca + limpeza + iluminacao + asfalto + crianca + estetica) / 6 * 10) / 10;
        return mediaarred;
    }

    //Dados do Heatmap
    var heatmapData = [
//Centro
        {location: new google.maps.LatLng(-20.4617189, -54.61223709999999), weight: media()},
//Tiradentes
        {location: new google.maps.LatLng(-20.4804084, -54.5711203), weight: media()},
//Vila Vilas Boas
        {location: new google.maps.LatLng(-20.4874507, -54.59030560000001), weight: media()},
//Pioneiros
        {location: new google.maps.LatLng(-20.5111925, -54.614979), weight: media()},
//Aero Rancho
        {location: new google.maps.LatLng(-20.51886, -54.6478885), weight: media()},
//Jardim São Conrado
        {location: new google.maps.LatLng(-20.4965941, -54.6792266), weight: media()},
//Vila Taveiropolis
        {location: new google.maps.LatLng(-20.4750862, -54.6808111), weight: media()},
//Santa Fe
        {location: new google.maps.LatLng(-20.4527743, -54.5900068), weight: media()},
//Coronel Antonino
        {location: new google.maps.LatLng(-20.4206427, -54.59030560000001), weight: media()},
//São Francisco
        {location: new google.maps.LatLng(-20.4462987, -54.61223709999999), weight: media()},
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
        maxIntensity: 5,
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

            var mediatext = function () {
                var seguranca = Math.ceil(Math.random() * 5 * 10) / 10;
                var limpeza = Math.ceil(Math.random() * 5 * 10) / 10;
                var iluminacao = Math.ceil(Math.random() * 5 * 10) / 10;
                var asfalto = Math.ceil(Math.random() * 5 * 10) / 10;
                var crianca = Math.ceil(Math.random() * 5 * 10) / 10;
                var estetica = Math.ceil(Math.random() * 5 * 10) / 10;
                var mediaarred = Math.ceil((seguranca + limpeza + iluminacao + asfalto + crianca + estetica) / 6 * 10) / 10;
                //retorna texto com a média e todas as notas
                return "Média: " + mediaarred + "\nSegurança: " + seguranca + "\nLimpeza: " + limpeza + "\nIluminação: " + iluminacao + "\nAsfalto: " + asfalto + "\nCriança: " + crianca + "\nEstética: " + estetica;
            }

            alert("Bairro: " + place.name + "\n" + mediatext());


        }
        else {
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