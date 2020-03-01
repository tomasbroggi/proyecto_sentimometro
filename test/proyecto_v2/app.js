var express = require('express');
var hbs = require('express-handlebars');
var app = express();
app.use(express.urlencoded({extended:true}));



app.engine('handlebars',hbs()); // aca y abajo digo que uso handlebars como motor de templates
app.set('view engine','handlebars');

app.get('/alta', function (req, res){ //1-1 para entrar a una ruta handlebars primero tengo que crear una ruta express.
    res.render('formulario'); //1-2 http://localhost/alta retorta 'formulario', va a views y busca formulario.handle y mete el codigo de ese .html en {{{body}}} si especifico eso
}); //lo de arriba va relacionado con lo de aca abajo
app.post('/procesar_alta', function (req, res){
    var nombre = req.body.nombre;
    if(req.body.nombre==""){
        res.render("formulario", {error:"Ingrese el nombre"});
    }else{
        if(req.body.nombre.lenght>5){
            //MAS DE 5
            res.render("ok");
        } else{
            res.render("formulario", {error:"El minimo es de 5 caracteres", nombre: req.body.nombre});
            datos: req.body
        }
  
    }

  
});
app.listen(80, function(){
    console.log("Escuchando puerto 80");
});