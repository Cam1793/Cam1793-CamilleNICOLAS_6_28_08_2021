//Importer le fichier model d'un produit /models/thing
const Sauce = require('../models/sauce');
//Importer le package fs file system permettant d'accèder au système des fichiers afin de les supprimer
const fs = require('fs');

//CRUD Create Read Uptade Delete

//Création d'un produit
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      /*likes = 0,
      dislikes = 0,
      usersLiked = [],
      usersDisliked = [],*/
      //configuration de l'url de l'image 
      //.protocol http ou https, on ajoute ://
      //.get('host') nom de l'hote, on ajoute le dossier images
      //.file.filename = .lefichier.lenomdufichier
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};

//Récupère un produit par l'id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Modifie un produit via son id (pour l'images importer ou une chaine de caractère)
exports.modifySauce = (req, res, next) => {
    //créer un objet et cherche si req.file existe déjà
    const sauceObject = req.file ?
      {
        //Si modification de l'image de l'objet, on récupère le body du produit en parse
        ...JSON.parse(req.body.sauce),
        //et on modifie l'imageUrl
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        //Si  modification de chaine de caractère on modifie le body
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
};

//Supprime le produit via son id et son image
exports.deleteSauce = (req, res, next) => {
    //Cherche le produit par son id
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        //Récupère le nom du fichier 
        //.split => récupère avant .../images/ et après /images/...
        //avant .../images positionnement 0  //après /images/... positionnement 1 
        //donc on choisi 1 car permettant de récupérer l'url de l'image qui est après le dossier images
        const filename = sauce.imageUrl.split('/images/')[1];
        // fs.unlink supprime le nom du fichier dans le dossier images
        fs.unlink(`images/${filename}`, () => {
          //callback retour on supprime également le produit par son id  
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};