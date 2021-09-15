## HOT TAKES BACK-END ##

## Installation du back-end ##

## Information prérequis ##
Pour pouvoir lancer le back-end de l'application, vous avez besoin d'avoir Node.js et npm localement installés dans votre pc.

Pour tester le projet, vous devez créer 2 fichier DOTENV intitulés : development.env et production.env. 

Dans le fichier development.env, il faut intégrer la variable environnement utilisée, les configurations de votre base de données MongoDB, les configurations de votre localhost et du port ainsi que votre token. Cela ce présente comme ceci :
-  NODE_ENV=development
-  JWT_TOKEN_SECRET= Votre secret pour chiffrer et déchiffrer le token.
-  DB_USERNAME= Le nom d'utilisateur de la base de données.
-  DB_PASSWORD= Le mot de passe de la base de données.
-  DATA_BASE_NAME= Le nom de la base de données.
-  HOST=localhost (la machine sur laquelle se trouve le serveur: donc localhaost c'est votre machine locale).
-  PORT= 3000 (le port sur lequel il écoute le serveur et écoute les appels reçues).

Afin de vous faciliter la tâche, les fichiers sont déjà intégré dans le dossier back-end. Il vous reste à les complèter.

## Installation ##
Dans votre terminal, à l'intérieur de ce dossier, faites `npm install`. Une fois installé, pour lancer le serveur en mode developpement : `npm run dev`. 

Pour lancer le serveur en mode production : `npm run prod`. 

Sinon, pour le lancer directement en mode developement : `npm start`.

Le serveur doit être lancé sur un localhost avec par défaut un port 3000. 