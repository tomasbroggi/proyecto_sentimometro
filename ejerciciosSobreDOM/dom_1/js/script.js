function suma(){

    var n1 = parseInt(document.getElementById("txtNumero1").value);
    var n2 = parseInt(document.getElementById("txtNumero2").value);

    var suma = n1 + n2;

    document.getElementById("res").value = suma;

}

function limpiar(){
    document.getElementById("txtNumero1").value = "";
    document.getElementById("txtNumero2").value = "";
    document.getElementById("res").value = "";
}

