//Importer le fichier model d'un produit /models/thing
const Sauce = require('../models/sauce');
//Importer le package fs file system permettant d'accèder au système des fichiers afin de les supprimer
const fs = require('fs');

//CRUD Create Read Uptade Delete


//Like ou Dislike une sauce
exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;

  Sauce.updateOne({ _id : req.params.id})
  .then (sauce => {
    //Si like est = 1, le user aime
  if (like === 1) {
      //on ajoute 1 dans la base de données mongoDB
      {$inc: {likes : 1}};
      //on ajoute like + 1
      sauce.likes += 1;
      //on ajoute le userId dans la base de données mongoDB
      {$push: {userLiked : userId }}
      //Si like est = -1, le user n'aime pas
  }else if (like === -1) {
      //on enlève 1 dans la base de données mongoDB
      {$inc: {likes : -1}};
      //on enlève like  1
      sauce.dislikes -= 1;
      //on ajoute le userId dans la base de données mongoDB
      {$push: {userLiked : userId }}
      //Si like est = 0, le user annule son like
  }else if (like === 0) {
      //retire son like
      sauce.likes -= 1;
      //retire son dislike
      sauce.dislikes -= 1;
  }
  //Sauvegarde la sauce modifié dans la base de données mongoDB
  sauce.save()
    //retour promise status OK
    .then(() => res.status(201).json({ message: 'Sauce liked !'}))
    //retour erreur requète
    .catch(error => res.status(400).json({ error }));

  })
  //retour erreur communication avec le serveur
  .catch(error => res.status(500).json({ error }));

};

//Création d'un produit
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      //configuration de l'url de l'image 
      //.protocol http ou https, on ajoute ://
      //.get('host') nom de l'hote, on ajoute le dossier images
      //.file.filename = .lefichier.lenomdufichier
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      //retour promise status OK et ressource bien créée
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      //retour erreur requète
      .catch(error => res.status(400).json({ error }));
};

//Récupère un produit par l'id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      //retour promise status OK
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      //retour promise erreur serveur
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
      //retour promise status OK
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      //retour erreur requète
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
            //retour promise status OK  
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            //retour erreur requète
            .catch(error => res.status(400).json({ error }));
        });
      })
      //retour erreur communication avec le serveur
      .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      //retour promise status OK  
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      //retour erreur requète
      res.status(400).json({
        error: error
      });
    }
  );
};