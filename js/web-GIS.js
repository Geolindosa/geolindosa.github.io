    //botón de pantalla completa
    var mapId = document.getElementById('map');
    function fullScreenview(){
        if(document.fullscreenElement){
            document.exitFullscreen()
        }else{
        }

        mapId.requestFullscreen();
    }


    //Imprimir mapa
    $('.print-map').click(function(){
    window.print();
    });

    var customActionToPrint = function(context, mode) {
    return function() {
        window.alert("We are printing the MAP. Let's do Custom print here!");
        context._printMode(mode);
    }   };

   //Imprimir mapa
    //L.control.browserPrint({
    //    position: 'topright', 
     //   title: 'Imprimir recorte de pantalla'
    //}).addTo(map);

    //Agregar búsqueda
    //L.Control.geocoder().addTo(map);



    //Medir en leaflet
    //L.control.measure(
    //    { primaryAreaUnit: 'sqmeters', secondaryAreaUnit: 'hectares' }
    //).addTo(map);


    //Zoom a la capa
    //$('.zoom-to-layer').click(function(){
    //map.setView([2.5197, -72.747], 12)
    //})
