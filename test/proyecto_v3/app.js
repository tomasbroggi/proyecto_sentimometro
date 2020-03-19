var express = require('express');
var app = express();
var mongoose = require('mongoose');
var hbs = require('express-handlebars');

mongoose.Promise = global.Promise;

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

// Async / Await
async function conectar() {
    await mongoose.connect(
            'mongodb://10.128.35.136:27017/curso', 
            {useNewUrlParser: true}
    )
    console.log('Conectado!');
}
conectar();

const ArtistaSchema = mongoose.Schema({
    nombre: String,
    apellido: String
})

const ArtistaModel = mongoose.model('Artista',
                            ArtistaSchema);


// Promise - Then
/*
mongoose.connect(
    'mongodb://10.5.20.78:27017', 
    {useNewUrlParser: true}
).then(function() {
    console.log('Conectado');
})
*/
app.use(express.urlencoded({extended: true}));

// -- CORTAR ACA 

app.get('/alta', function(req, res) {
    res.render('formulario');
})

app.post('/alta', async function(req, res) {
    // req.body.nombre
    // req.body.apellido
    if (req.body.nombre=='') {
        res.render('formulario', {
            error: 'El nombre es obligatorio',
            datos: {
                nombre: req.body.nombre,
                apellido: req.body.apellido
            }
        });
        return;
    }
    await ArtistaModel.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido
    });
    res.redirect('/listado');
});

app.get('/listado', async function(req, res) {
    var abc = await ArtistaModel.find().lean();
    //res.redirect('/alta');
    
    res.render('listado', {listado: abc});
});

app.get('/borrar/:id', async function(req, res) {
    // :id -> req.params.id
    await ArtistaModel.findByIdAndRemove(
        {_id: req.params.id}
    );
    res.redirect('/listado');
});


app.get('/editar/:id', async function(req, res) {
    var artista = await ArtistaModel.findById({
        _id: req.params.id
    }).lean();
    res.render('formulario', {datos: artista});
});

app.post('/editar/:id', async function(req, res) {
    if (req.body.nombre=='') {
        res.render('formulario', {
            error: 'El nombre es obligatorio',
            datos: {
                nombre: req.body.nombre,
                apellido: req.body.apellido
            }
        });
        return;
    }
    await ArtistaModel.findByIdAndUpdate(
        {_id: req.params.id},
        {
            nombre: req.body.nombre, 
            apellido: req.body.apellido
        }
    );
    res.redirect('/listado');
});



app.get('/buscar/:id', async function(req, res) {
    var listado = await ArtistaModel.find({_id: req.params.id});
    res.send(listado);
});

app.get('/agregar', async function(req, res) {
    var nuevoArtista = await ArtistaModel.create(
        {nombre: 'Fat', apellido: 'Mike'}
    );
    res.send(nuevoArtista);
});

app.get('/modificar', async function(req, res) {
    await ArtistaModel.findByIdAndUpdate(
        {_id: '5e56fe51143a530abc834fa8'},
        {nombre: 'Nuevo nombre', apellido: 'NA'}
    );
    res.send('ok');
});

app.get('/borrar', async function(req, res) {
    var rta = await ArtistaModel.findByIdAndRemove(
        {_id: '5e56fe51143a530abc834fa8'}
    );
    res.send(rta);
});


app.listen(3000, function() {
    console.log('App en localhost');
});