
var sitiosDatos = [];

function agregarDatosSitios(guardarNombreSitio, guardarDescripcion, guardarFecha, guardarTuNombre, guardarTuEmail, guardarTipo, latitud, longitud) {

        var NuevoSitio = {
                name: guardarNombreSitio,
                description: guardarDescripcion,
                register: guardarFecha,
                yourname: guardarTuNombre,
                youremail: guardarTuEmail,
                tipositio: guardarTipo,
                latitud: latitud,
                longitud: longitud
    };

    let data = {
        "nombre_sitio": guardarNombreSitio,
        "tipositio" : guardarTipo, 
        "descripcion": guardarDescripcion, 
        "fecha_reg" : guardarFecha, 
        "nombre_persona" : guardarTuNombre, 
        "correo" : guardarTuEmail, 
        "latitud": latitud, 
        "longitud": longitud 
        };
    
    crearSitios_h(JSON.stringify(data));
    
    sitiosDatos.push(NuevoSitio);
}

function obtenerListaSitios() {
    return sitiosDatos;
}