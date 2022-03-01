### Le projet

🎯 Créer une application

❒ l’application peut être clonée et lancée ;

❒ l’application web est capable de gérer une session utilisateur avec une base de données SQL ;

❒ l’application web est persistante pour toutes les actions des utilisateurs ;

❒ les actions des utilisateurs sont retrouvées dans la session suivante.

❒ l'application a été développée grâce à un framework front-end en JavaScript (sauf pour les soutenance avant le 1er octobre 2021, voir détail en haut du projet).

 🎯 Personnaliser le contenu envoyé à un client web

❒ l’application web contient les logos fournis par le client ;

❒ l’application web respecte la gamme de couleur demandée par le client ;

❒ la page est conforme aux normes WCAG.

 🎯 Authentifier un utilisateur et maintenir sa session


❒ l’application web se connecte à l’application ;

❒ l’application web se déconnecte de l’application ;

❒ L’application web est persistante pendant le temps de connexion de l’utilisateur. 

 🎯 Gérer une base de données construite avec SQL 

 
❒ l’utilisateur peut faire une requête des données depuis SQL ;

❒ l’utilisateur peut soumettre des changements à la base de données SQL.

🎯 Implémenter un stockage de données sécurisé en utilisant SQL

❒ la base de données stocke les informations de connexion des utilisateurs de manière sécurisée.


### Installation

- Cloner ce repo depuis GitHub.

#### Frontend

* `npm i` // installer les dépendencies.
* `npm run serve` // lancer le serveur vue CLI (development build)

####  Backend

* `npm i` // installer les dépendencies.
* `nodemon server` // lancer le serveur API

---

### Base de données
Se connecter au serveur MySql de votre choix. Exécuter la commande:
`CREATE DATABASE groupomania;`

* Vérifiez les identifiants dans le fichier backend/config/.env :

* Importer le fichier groupomania.sql fourni (ex: mysql>use groupomania;
                                                  mysql>source groupomania.sql;)

