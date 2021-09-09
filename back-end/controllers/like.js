//Importer le fichier model d'un produit /models/thing
const Sauce = require('../models/sauce');


//Like ou Dislike une sauce
exports.handleLikeOption = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;
  
    Sauce.findOne({ _id : req.params.id})
    .then (sauce => {
      //Si like est = 1, le user aime
    if (like === 1) {
        //on ajoute 1 dans la base de données mongoDB
        {$inc: {likes : 1}};
        //on ajoute le userId dans la base de données mongoDB
        {$push: {userLiked : userId }}
        //Si like est = -1, le user n'aime pas
    }else if (like === -1) {
        //on enlève 1 dans la base de données mongoDB
        {$inc: {dislikes : 1}};
        //on ajoute le userId dans la base de données mongoDB
        {$push: {userDisliked : userId }}
        //Si like est = 0, le user annule son like
    }else if (like === 0) {
        //on vérifie le userId dans le tableau usersLiked
        let userLiked = sauce.usersLiked.find (id => id === userId);
            if(userLiked){
                //retire son like
                sauce.likes -= 1;
                //on retire le userid du tableau usersLiked
                sauce.usersLiked = createNewUserIdArray(sauce.userLiked, userId);
            }
        else {
        //on cherche dans le tableau des usersDisliked
        let userDisliked = sauce.usersDisliked.find (id => id === userId);
            if(userDisliked){
                //retire son dislike
                sauce.dislikes -= 1;
                //on retire le userid du tableau usersLiked
                sauce.userDisliked = createNewUserIdArray(sauce.userDisliked, userId);
            }     
        }     
    }
    //Sauvegarde la sauce modifié dans la base de données mongoDB
    sauce.save()
      //retour promise status OK
      .then(() => res.status(201).json({ message: 0 }))
      //retour erreur requète
      .catch(error => res.status(400).json({ error }));
  
    })
    //retour erreur communication avec le serveur
    .catch(error => res.status(500).json({ error }));
};  

function createNewUserIdArray (userIdArray, userId) {
    return userIdArray.filter(id => id !== userId);
} 