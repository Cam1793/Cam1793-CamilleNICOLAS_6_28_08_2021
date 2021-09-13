//Importation de express
const express = require('express');
//Iettre express dans une variable
const app = express();
//Importation de bodyParser
const bodyParser = require('body-parser');
//Importation des routes
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const likeRoute = require('./routes/like')
//Importation de mongooser
const mongoose = require('mongoose');
//Importation de path permettant d'accéder au path du serveur
const path = require('path');
//importation du fichier de config
const config =  require('./config.js');
console.log(config.DATA_BASE_NAME)
console.log(config.DB_PASSWORD)

//fonction pour lié la base de données mongoDB avec le serveur
mongoose.connect(`mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@camille-cluster.rldpw.mongodb.net/${config.DATA_BASE_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => {  
    console.log('Connexion à MongoDB échouée !')}
    );

  //CORS
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
app.use('/api/sauces', likeRoute);

//indique qu'à chaque requète, il faut gérer la ressource provenant du dossier images 
//de manière static => un sous repertoire de base _dirname vers la route images
app.use('/images', express.static(path.join(__dirname, 'images')));
//activation de express
module.exports = app;