var GEOVISOR_Img = false;
var COMO_LLEGAR_Img = false;
var REGISTRAR_SITIO_Img = false;
var FIESTA_Img = false;


$("document").ready(function() {
    //image GEOVISOR
    $("#img_GEOVISOR").mouseenter(function() {
        $(this).attr('src', 'img/buttons/Naranja/GEOVISOR.png');
    });
    //image GEOVISOR hover
    $("#img_GEOVISOR").mouseleave(function() {
        if (GEOVISOR_Img != true) {
            $(this).attr('src', 'img/buttons/Blanco/GEOVISOR.png');
        }
    });

    //image COMO_LLEGAR
    $("#img_COMO_LLEGAR").mouseenter(function() {
        $(this).attr('src', 'img/buttons/Naranja/COMO_LLEGAR.png');
    });
    //image COMO_LLEGAR hover
    $("#img_COMO_LLEGAR").mouseleave(function() {
        if (COMO_LLEGAR_Img != true) {
            $(this).attr('src', 'img/buttons/Blanco/COMO_LLEGAR.png');
        }
    });

    //image REGISTRAR_SITIO
    $("#img_REGISTRAR_SITIO").mouseenter(function() {
        $(this).attr('src', 'img/buttons/Naranja/REGISTRAR_SITIO.png');
    });
    //image REGISTRAR_SITIO hover    
    $("#img_REGISTRAR_SITIO").mouseleave(function() {
        if (REGISTRAR_SITIO_Img != true) {
            $(this).attr('src', 'img/buttons/Blanco/REGISTRAR_SITIO.png');
        }
    });

    //image FIESTA
    $("#img_FIESTA").mouseenter(function() {
        $(this).attr('src', 'img/buttons/Naranja/FIESTA.png');
    });
    //image FIESTA hover    
    $("#img_FIESTA").mouseleave(function() {
        if (FIESTA_Img != true) {
            $(this).attr('src', 'img/buttons/Blanco/FIESTA.png');
        }
    });

    $("#my_audio").get(0).play();
});

function Click_Image_Button_Option(image_id) {
    HideTextDescripcion();
    Default_Image_Button_Option();
    Default_Variables_Value();
    $("#img_" + image_id).attr('src', 'img/buttons/Naranja/' + image_id + '.png');
    $("#selloImage").css("visibility", "visible");
    $("#ContainerDesctipcion").css("visibility", "visible");
    $("#ContainerDesctipcion").css('height', '15hv');

    switch (image_id) {
        case "GEOVISOR":
            GEOVISOR_Img = true;
            ChangeSelloImage('SELLO_GEOVISOR');
            ChangeDescripcion('GEOLINDOSA <img class="imgLogo3" src="img/iconos/rupestre.png" alt="logo">');
            $("#GeovisorDescripcion").css('display', 'block');
            $("#MapsFrame").attr("src", "html/geovisor.html");
            break;
        case "COMO_LLEGAR":
            COMO_LLEGAR_Img = true;
            ChangeSelloImage('SELLO_GEOVISOR');
            ChangeDescripcion('COMO LLEGAR');
            $("#Como_llegarDescripcion").css('display', 'block');
            $("#MapsFrame").attr("src", "html/comollegar.html");
            break;
        case "REGISTRAR_SITIO":
            REGISTRAR_SITIO_Img = true;
            ChangeSelloImage('SELLO_GEOVISOR');
            ChangeDescripcion('REGISTRAR SITIO');
            $("#RegistrarSitioDescripcion").css('display', 'block');
            $("#MapsFrame").attr("src", "html/registrarsitio.html");
            break;
        case "FIESTA":
            FIESTA_Img = true;
            ChangeSelloImage('SELLO_GEOVISOR');
            ChangeDescripcion('FIESTAS Y CELEBRACIONES');
            $("#FiestasDescripcion").css('display', 'block');
            $("#MapsFrame").attr("src", "html/fiestas.html");
            break;

    }
}

function Default_Image_Button_Option() {
    $("#img_GEOVISOR").attr('src', 'img/buttons/Blanco/GEOVISOR.png');
    $("#img_COMO_LLEGAR").attr('src', 'img/buttons/Blanco/COMO_LLEGAR.png');
    $("#img_REGISTRAR_SITIO").attr('src', 'img/buttons/Blanco/REGISTRAR_SITIO.png');
    $("#img_FIESTA").attr('src', 'img/buttons/Blanco/FIESTA.png');

}

function Default_Variables_Value() {
    GEOVISOR_Img = false;
    COMO_LLEGAR_Img = false;
    REGISTRAR_SITIO_Img = false;

}

function ChangeSelloImage(image){
    $("#selloImage").attr('src', 'img/Sellos/' + image + '.png');
}

function ChangeDescripcion(title){
    $("#TitleDescripcion").html(title);
}

function HideTextDescripcion(){
    $("#GeovisorDescripcion").css('display', 'none');
    $("#Como_llegarDescripcion").css('display', 'none');
    $("#RegistrarSitioDescripcion").css('display', 'none');
    $("#FiestasDescripcion").css('display', 'none');

}

function CloseContainerDescripcion(){
    $("#ContainerDesctipcion").css("visibility", "hidden");
}
