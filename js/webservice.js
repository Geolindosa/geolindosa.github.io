function crearSitios_h(data)  {

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:4000/api/sitios/");
    
    xhr.setRequestHeader("Accept", "/");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onload = () => console.log(xhr.responseText);
    
    /*let data = `{
        "nombre_sitio": "Serranía de la Lindosa4",
        "tipositio" : "Cultural", 
        "descripcion": "Esta formación de origen precámbrico, ubicada en el suroccidente de la capital, constituye uno de los accidentes naturales más apreciados por la comunidad investigadora nacional e internacional. Se trata de estructuras rocosas y ambientales asociadas, cuya fragilidad no admite ninguna intervención humana, salvo la ocupación indígena, el uso científico y la explotación turística cuidadosa", 
        "fecha_reg" : "2022-08-14", 
        "nombre_persona" : "Juan de la Cruz", 
        "correo" : "juandelacruz@gmail.com", 
        "latitud": "2.4816", 
        "longitud": "-72.745" 
    }`;*/
    
    xhr.send(data);

}

