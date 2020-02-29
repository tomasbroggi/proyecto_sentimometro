var express = require('express');
var nodemailer = require('nodemailer'); //para llamar las funciones para enviar mails a este archivo
var hbs = require('express-handlebars');
var app = express();
//req lo que envia ely sen por decision.http://localhost/hola
//app.post usr completo formulario y envia los datos=!app.get cuando buscamos algo en google
app.use(express.static('public')); /*para hacer que la carpeta public entregue contenidos estataticos 
                                    (asi mismo como esta esa carpeta public la pasa a la pagina web ((se la muestra al usuario)))
                                    http://localhost/prueba.html por ejemplo
                                    */
app.use(express.urlencoded({extended:true}));//para cuando usamos formularios de los cuales tomamos algun dato()0005
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'tbroggi1@gmail.com',
        pass: '12345',
    }
});
app.get('/', function(req, res) {
    res.send('Pagina principal');
});

// http://localhost/hola?nombre=Orlando
app.get('/hola', function(req, res) {
    //res.send('Bienvenido '+req.query.nombre);
    res.send(`Bienvenido, ${req.query.nombre}`);
});

// http://localhost/hola/Orlando
app.get('/hola/:nombre', function(req, res) {
    res.send('Bienvenaaaaido '+req.params.nombre);
});

app.post('/contact', function(req, res){ //0005
    var opciones = {
        from:'tbroggi1@gmail.com',
        to:'tbroggi1@gmail.com',
        subject= 'Título del mail',
        text='Cuerpo del mail',
    }
    transporter.sendMail(opciones, function(error,data){
        if(error){
            res.send('No pude enviar el email');
        } else{
            res.send(req.body.name); //0010
            res.send(req.body.email);
            res.send(req.body.telefono);
            res.send(req.body.mensaje);  
        }
    });
    //console.log(req.body); //asi me lo detalla los consoles en la cmd de node
    //res.send(req.body.name); 0010 se pasa a la otra linea 0010 para el ejemplo de enviar mail
})
app.get('/acerca-de', function(req, res){
    res.render('acerca',{titulo: 'Mi titulo'}); //como config. una modificacion por handlebars. se pone el nombre del archivo sin el .handlebars (acerca).
    res.render('acerca',{body: 'Mi texto'});
});
app.listen(80, function() {
    console.log('App escuchando en el puerto 80');
});
