var tiempo=0;
var intervalo;
var contesto=0;
var elementoSonidoGeneral=$("#audiogeneral")[0];
var elementoSonidoVictoria=$("#audiovictoria")[0];
var elementoSonidoPerdida=$("#audioperdida")[0];
var elementoSonidoTimeOut=$("#audiotimeout")[0];
var elementoSonidoBoton=$("#sonidoboton")[0];
var respuestacorrecta=0;
var confirinijuego= 0;
var contRespuestasCorrectas = 0; //contador de respuestas correctas
var contintentos=0; //cuenta las veces que has juegado dentro de la pagina.

  function generarNumeros() {  // funcion que crea variables a operar     
        var a=parseInt(Math.random()*10)+1;
        var b=parseInt(Math.random()*10)+1;
          $("#numero1").val(a);
          $("#numero2").val(b);
        respuestacorrecta=a+b;
    };

    function traerNombre(){  //funcion que trae el nombre del usuario o anonimo! por defecto.
        var nombreuser=$("#nombre").val(); 
        if(nombreuser==""){
             $("#nompresent").text("bienvenido jugador anonimo!");}
        else{$("#nompresent").text("bienvenido"+ nombreuser);}
    };


generarNumeros(); //ejecuta al inicio la funcion que crea las variables operadoras!

//botones seleccion de dificultad:
$("#facil").on("click",function(){
    tiempo=20;
    elementoSonidoBoton.play();
    $("#empezar").css("display","inline");
    $("#facil").css("box-shadow","0 0 36px rgba(32, 250, 4, 0.55)");
    $("#medio,#dificil").css("box-shadow","none");
});
$("#medio").on("click",function(){
    tiempo=14;
    elementoSonidoBoton.play();
    $("#empezar").css("display","inline");
    $("#medio").css("box-shadow","0 0 36px rgba(255, 255, 4, 0.54)");
    $("#facil,#dificil").css("box-shadow","none");
});
$("#dificil").on("click",function(){
    tiempo=8;
    elementoSonidoBoton.play();
    $("#empezar").css("display","inline");
    $("#dificil").css("box-shadow","0 0 36px rgba(255, 4, 4, 0.59)");
    $("#medio,#facil").css("box-shadow","none");
});

// ejecucion boton ¡"EMPEZAR JUEGO"! a jugar luego de la presentacion:
$("#empezar").on("click",function(){
    confirinijuego= 1;  //variable de confirmacion para la tecla "enter".
    elementoSonidoBoton.play();
    $(".presentacion").slideUp("fast");
    $("#juego").slideDown("fast");
    $("#tiempo").html(tiempo);


    // ================= Funcion que controla el tiempo en el juego. ===============
    intervalo=setInterval(function(){
        tiempo--;
        $("#tiempo").html(tiempo);
        if(tiempo<10){
            $("#tiempo").css("color","yellow"); 
        }
        if(tiempo<5){
            $("#tiempo").css("color","red");
            $("body").css("background","salmon");
        }
        if(tiempo==0){            
            clearInterval(intervalo);
            elementoSonidoGeneral.pause();
            if(contesto==0){
            elementoSonidoTimeOut.play();
            elementoSonidoTimeOut.volume=0.3;
               $(".gameover,.mensajeover").fadeIn("fast");
                mostrarResultadoFinal(window.respuestasCorrectas);
            };
        }
    },1000); 
});

//    -----------------------ejecucion boton de responder-----------------------
$("#responder").on("click",evaluar);

function evaluar(){
    var resuser=$("#respuestausuario").val();
    if (resuser==respuestacorrecta){
        clearInterval(intervalo);
        elementoSonidoGeneral.pause();
        $("#tiempo").fadeOut(100);
        contRespuestasCorrectas++;  // incremento contador de respuesta correcta
        contintentos++; //aumenta el contador de intentos hechos!.
        contesto=1;
        elementoSonidoVictoria.play();
        elementoSonidoVictoria.volume=0.2;
        alert("Saber Sumar 😃");
    mostrarResultadoFinal(window.respuestasCorrectas);
}
    else { elementoSonidoPerdida.play();
        elementoSonidoPerdida.volume=0.3;
         contintentos++; //aumenta el contador de intentos hechos!.
        mostrarResultadoFinal(window.respuestasCorrectas);
        alert("Repasar sumas de primaria mucha calcu IA 😢");
    }
}
$(document).on("keypress",function(event){
    if(event.which==13 && confirinijuego==1){
        evaluar();
    }
});

// boton reiniciar
$("#reiniciar").on("click",function(){
    location="index.html";
});


//==========================FUNCION DE VENTANAS MODALES!...========================================
      
        //  =============== MODAL BIENVENIDA!=====================
          
        $('#modal-bienvenida').fadeIn(300); //inicia el modal bienvenida!
         // boton "VAMOS A JUGAR" Cierra modal de bienvenida y arranca el juego
            $('#modal-cerrar').on('click', function() {
           $('#modal-bienvenida').fadeOut(200);  
        elementoSonidoBoton.play(); // sonido de click al oprimir un boton.
        elementoSonidoGeneral.volume=0.25; //volumen de sonido de fondo general.
        elementoSonidoGeneral.play(); //inicio raproduccion de sonido general.
        $(".presentacion").fadeIn("fast"); //trae a pantalla la seccion presentacion
        $("#empezar").css("display","none");//desactiva el boton "empezar juego" (para obligar a colocar dificultad).
             traerNombre();   
        });
 
            // Función que muestra el resultado final con nivel
        window.mostrarResultadoFinal = function() {
            let emoji, titulo, nivel;

            if (contRespuestasCorrectas >= 5) {
                emoji  = '🍄';
                titulo = '¡Eres nivel Mario!';
                nivel  = 'Maestro de las sumas. ¡Impresionante!';
            } else if (contRespuestasCorrectas >= 3) {
                emoji  = '🧠';
                titulo = '¡Eres nivel Einstein!';
                nivel  = 'Muy bien, casi genio.';
            } else {
                emoji  = '🤖';
                titulo = '¡Eres nivel IA!';
                nivel  = 'Tranquilo, la máquina también falla a veces.';
             }

            $('#resultado-emoji').text(emoji);
            $('#resultado-titulo').text(titulo);
             $('#resultado-nivel').text(nivel);
             $('#resultado-puntaje').text('Respuestas correctas: ' + contRespuestasCorrectas + ' / ' + contintentos);
             $('#modal-resultado').fadeIn(300);
        };

       // Botón "---VOLVER A JUGAR---"! del modal de resultado:
       $('#btn-volver-jugar').on('click', function() {
            $('#modal-resultado').fadeOut(200);
            window.respuestasCorrectas; 
            generarNumeros(); //genera nuevamente los numeros aleatorios para nuevo intento
            $("#respuestausuario").val(""); //limpia la casilla (input) donde se responde...       
          
            // $('.iniciar').fadeIn(200); // Muestra el botón iniciar como al principio
              });

        // Botón salir: cierra resultado y muestra mensaje del tigre
        $('#btn-salir').on('click', function() {
            $('#modal-resultado').fadeOut(200);
            setTimeout(function() {
                $('#modal-salida').fadeIn(300);
           }, 250);
        });

        // Cierra el mensaje del tigre
        $('#btn-cerrar-salida').on('click', function() {       
             $('#modal-salida').fadeOut(200);
        });

