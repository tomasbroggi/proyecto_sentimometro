var caja = document.getElementById("caja");

function amarillo(){
    caja.style.backgroundColor = "yellow";
    caja.style.width = "800px";
}

function azul(){
    caja.style.backgroundColor = "blue";
    caja.style.width = "400px";
}

function mostrar(){
    caja.style.display = "block";
}

function ocultar(){
    caja.style.display = "none";
}

function cambioColorFondo(){
    cuerpo.style.background = document.getElementById("color").value;
}