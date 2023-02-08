/*---------------------------------------------------------------------*/
//creo variable
var map = L.map('map', {
    minZoom: 8,
    maxZoom: 16
}).setView([1.9, -71.8], 9);
map.zoomControl.setPosition('topright');

//agregar basemap



var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


//agregar control de escala
L.control.scale({ position: 'bottomright' }).addTo(map);

//mostrar coordenadas
map.on('mousemove', function (e) {
    $('.coordinate').html(`Latitud: ${e.latlng.lat.toFixed(3)} Longitud: ${e.latlng.lng.toFixed(3)}`)
})

//para centrar la vista cada vez que hacemos clic en un sitio (H)
map.on('popupopen', function (e) {
    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= ((e.target._popup._container.clientHeight) / 2)+100 ; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px), { animate: true }); // pan to new center
});

//Medir en leaflet
L.control.measure(
    { primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'hectares' }
).addTo(map);

//Agregar búsqueda
L.Control.geocoder().addTo(map);



/*---------------------------------------------------------------------*/

//Cargar el Geojson - agrupamiento de marcadores capa natural
var markern = L.markerClusterGroup({
});

//Fuente para las imágenes
let fuente = 'Fuente: Secretaría de cultura y Turismo Guaviare'

var natu = L.geoJSON(natural, {
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(
            feature.properties.nombre, { permanent: true, interactive: true, direction: 'center', className: 'natuLabel' });
        layer.bindPopup(
            "<p><b><center>" +
            feature.properties.nombre +
            "</center></b></p>" +
            feature.properties.descrip +
            '<center><br/>' +
            feature.properties.fotografia +
            "<p><center>" +
            fuente +
            "<p><center>" +
            '<div id = "natu3d"><p><b> <a href="#">¡Click aquí para ver el Modelo 3D de este sitio!</a> </div></b></p>' +
            "</center></b></p>", { maxWidth: 700, closeOnClick: true, closeButton: true })
    }
});
natu.addTo(markern);
markern.addTo(map);

//Cargar el Geojson - agrupamiento de marcadores capa cultural
var markerc = L.markerClusterGroup({
});

var cultu = L.geoJSON(cultural, {
    onEachFeature: function (feature, layer) {
        layer.bindTooltip(
            feature.properties.nombre, { permanent: true, interactive: true, direction: 'center', className: 'cultuLabel' });
        layer.bindPopup(
            "<p><b><center>" +
            feature.properties.nombre +
            "</center></b></p>" +
            feature.properties.descrip +
            '<center><br/>' +
            feature.properties.fortografi +
            "<p><center>" +
            fuente +
            "<p><center>" +
            '<div id = "cultu3d"><p><b> <a href="#">¡Click aquí para ver el Modelo 3D de este sitio!</a> </div></b></p>'  +
            "</center></b></p>", { maxWidth: 700, closeOnClick: true, closeButton: true })
    }
});
cultu.addTo(markerc);
markerc.addTo(map);
    
////modal fuente--> https://jsfiddle.net/slead/kq8xzxqb/
natu.on("click", function (natural) {
    var content = natural.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo1 = document.getElementById('natu3d');
    modelo1.onclick = function () {
        var win = L.control.window(map, {  title: natural.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})

cultu.on("click", function (cultural) {
    var content = cultural.layer.feature.properties.modelo_3d;
    //console.log(document.getElementById('testmodelo'))
    let modelo = document.getElementById('cultu3d');
    modelo.onclick = function () {
        var win = L.control.window(map, { title: cultural.layer.feature.properties.nombre, maxWidth: 4000, modal: true })
            .content(content)
            //.prompt({callback:function(){alert('Gracias por ver este modelo 3D, recuerda que puedes encontrarlo en sketchfab.com')}})
            .show()
    }
})

/*--------------------------------------------------------------------*/
//Leaflet control basemaps
var baseMap = {
    'Imagen Satelital (ESRI)': Esri_WorldImagery,
    'OpenStreetMap': CyclOSM
}

var overlayMaps = {
    'Atractivos Naturales': markern,
    'Atractivos Culturales': markerc,
}

/*-----------------------------------------------------------------*/
//agregar la capa municipios mostrando el nombre de cada uno (h)
function popup_mpio(feature, layer) {
    if (feature.properties && feature.properties.MPIO_CNMBR) {
        layer.bindTooltip(feature.properties.MPIO_CNMBR, { permanent: true, interactive: true, direction: 'center', className: 'mpios' });
    }
}

var municipiosguaviare = L.geoJson(municip, {
    onEachFeature: popup_mpio
});

$.getJSON("municip.geojson", function (municip) {
    municipiosguaviare.addData(municip);
});
municipiosguaviare.addTo(map);

municipiosguaviare.setStyle({
    color: "green",
    opacity: 0.5,
    fillColor: '#b7e263',
    fillOpacity: 0.2
});

//agregar la capa SERRANIA DE LA LINDOSA
function popup_lindo(feature, layer) {
    if (feature.properties && feature.properties.NOMBRE) {
        layer.bindTooltip(
            '<a><b><center>Reserva Forestal Protectora Nacional<br></center></b></a>'+'<center>'+ feature.properties.NOMBRE +'</center>',
            { permanent: false, interactive: true, sticky:true , className: 'lindosa',direction:'left' });
    }}

var serranialindosa = L.geoJson(lindosa, {
    onEachFeature: popup_lindo
});

$.getJSON("aap.geojson", function (lindosa) {
    serranialindosa.addData(lindosa);
});
serranialindosa.addTo(map);

serranialindosa.setStyle({
    color: "#520000",
    weight: 4,
    opacity: 0.5,
    fillColor: '#520000',
    fillOpacity: 0.1
});

//agregar la capa resguardos mostrando el nombre de cada uno (h)
function popup_res(feature, layer) {
    if (feature.properties && feature.properties.Nombre) {
        layer.bindPopup(
            '<center>'+'<a><b>Resguardo: </b></a>' + feature.properties.Nombre +'<center>'+
            '<a><b>Pueblo indígena: </b></a>' + feature.properties.Pueblo, 
            );
    }}

var resguardguaviare = L.geoJson(resguard, {
    onEachFeature: popup_res
});

$.getJSON("resguard.geojson", function (resguard) {
    resguardguaviare.addData(resguard);
});
resguardguaviare.addTo(map);

resguardguaviare.setStyle({
    color: "red",
    weight: 2,
    dashArray: '5',
    opacity: 0.2,
    fillColor: 'red',
    fillOpacity: 0.1
});

//agregar la capa AAP mostrando el nombre de cada uno (h)
function popup_aap(feature, layer) {
    if (feature.properties && feature.properties.sub_area) {
        layer.bindPopup(
            '<a><b><center>Área Arqueológica Protegida<br></center></b></a>'+'<center>'+ feature.properties.sub_area +'</center>'
           /*  {className: 'aap'} */);
    }}

var aapguaviare = L.geoJson(aap, {
    onEachFeature: popup_aap
});

$.getJSON("aap.geojson", function (aap) {
    aapguaviare.addData(aap);
});
aapguaviare.addTo(map);

aapguaviare.setStyle({
    color: "blue",
    weight: 2,
    dashArray: '5',
    opacity: 0.2,
    fillColor: 'blue',
    fillOpacity: 0.2
});

/*-----------------------------------------------------------------*/


//Zoom a la capa
$('.zoom-to-layer').click(function () {
    map.setView([2.5197, -72.747], 12)
})

//Control capas - basemaps y sitios
var controlCapas = L.control.layers(baseMap, overlayMaps, { collapsed: true, position: 'topleft' }).addTo(map);
//control capas - polígonos 
controlCapas.addOverlay(serranialindosa, "🟫 Serranía Lindosa");
controlCapas.addOverlay(resguardguaviare, "🟥 Resguardos Indígenas");
controlCapas.addOverlay(aapguaviare, "🟦 Áreas Arqueológicas Protegidas");
controlCapas.addOverlay(municipiosguaviare, " 🟩 Municipios");


//Leaflet.Locate
var lc = L.control
    .locate({
        position: "topright",
        strings: {
            title: "Muéstrame dónde estoy"
        }
    })
    .addTo(map);


