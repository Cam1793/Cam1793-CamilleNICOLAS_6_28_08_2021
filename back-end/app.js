//importation de express
const express = require('express');
//Mettre express dans une variable
const app = express();
//importation de bodyParser
const bodyParser = require('body-parser');
//importation des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
//importation de mongooser
const mongoose = require('mongoose');
//importation de path permettant d'accéder au path du serveur
const path = require('path');

//fonction pour lié la base de données mongoDB avec le serveur
mongoose.connect('mongodb+srv://cam1711:Mimpewdsmarkh2o@test.axw5u.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

//activation des Routes avec les liens url
app.use('/api/sauces', saucesRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
//indique qu'à chaque requète, il faut gérer la ressource provenant du dossier images 
//de manière static => un sous repertoire de base _dirname vers la route images
app.use('/images', express.static(path.join(__dirname, 'images')));
//activation de express
module.exports = app;