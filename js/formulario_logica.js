document.querySelector('#btnSubmit').addEventListener('click', guardarDatosSitios);
imprimirTabla();

var longitud_e;
var latitud_e;

function guardarDatosSitios() {
  
    var guardarNombreSitio = document.querySelector('#name').value,
        guardarDescripcion = document.querySelector('#description').value,
        guardarFecha = document.querySelector('#register').value;
        guardarTuNombre = document.querySelector('#yourname').value;
        guardarTuEmail = document.querySelector('#youremail').value;
        guardarTipo = document.querySelector('#tipositio').value;
        guardarLatitud = latitud_e;
        guardarLongitud = longitud_e;

    agregarDatosSitios(guardarNombreSitio, guardarDescripcion, guardarFecha, guardarTuNombre, guardarTuEmail, guardarTipo, guardarLatitud, guardarLongitud);
    imprimirTabla();
}

function imprimirTabla() {
    var lista = obtenerListaSitios(),
    tbody = document.querySelector('#tablaSitios tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < lista.length; i++) {
        var row = tbody.insertRow(i),
            nombreCelda = row.insertCell(0),
            descripcionCelda = row.insertCell(1);
            fechaCelda = row.insertCell(2);
            tunombreCelda = row.insertCell (3);
            tuemailCelda = row.insertCell (4);
            tipoCelda = row.insertCell (5);
            latitudCelda = row.insertCell (6);
            longitudCelda = row.insertCell (7);
        
        nombreCelda.innerHTML = lista[i].name;
        descripcionCelda.innerHTML = lista[i].description;
        fechaCelda.innerHTML = lista[i].register;
        tunombreCelda.innerHTML = lista[i].yourname;
        tuemailCelda.innerHTML = lista[i].youremail;
        tipoCelda.innerHTML = lista[i].tipositio;
        latitudCelda.innerHTML =  lista[i].latitud;
        longitudCelda.innerHTML =  lista[i].longitud;  
        tbody.appendChild(row);
    }
}

$(function () {
    $('[data-toggle="popover"]').popover()
    })

function validar(){
    var valNombre = document.getElementById("name").value;
    var valTipo = document.getElementById("tipositio").value;
    var valDescrip = document.getElementById("description").value;
    var valYourName = document.getElementById("yourname").value;
    var valYourEmail = document.getElementById("youremail").value;
    var valYourLat = latitud_e;
    var valYourLong = longitud_e;

    if(valNombre.length == 0) alert('Ingresa un nombre para el sitio')
    else if (valTipo.length == 0) alert('Elige un tipo de sitio') 
    else if (valDescrip.length == 0) alert('Ingresa una descripción para el sitio') 
    else if (valYourName.length  == 0 ) alert('Ingresa tu nombre')
    else if (valYourEmail.length  == 0 ) alert('Ingresa tu correo')
    else if (valYourLat.length  == 0 ) alert('Selecciona un punto en el mapa')
    else if (valYourLong.length  == 0 ) alert('Selecciona un punto en el mapa')
    else alert('Datos correctos')
}

function myFunction(latitud, longitud) {
    console.log('test'+  latitud + ' ' + longitud);
    this.longitud_e = longitud;
    this.latitud_e = latitud;
}

