# Microservices-Architecture-with-Node.js-RabbitMQ-Docker

📝 Description
Ce projet implémente une architecture microservices complète comprenant la gestion des produits, des commandes, et une couche d'authentification sécurisée.

🚀 Technologies utilisées
Runtime: Node.js / Express.js

Base de données: MongoDB (Mongoose)

Communication: Axios (Synchrone) & RabbitMQ (Asynchrone)

Sécurité: JWT (JSON Web Tokens) & Bcrypt

Déploiement: Docker & Docker Compose

🏗️ Architecture du Projet
Auth-Service: Gestion des utilisateurs (Register/Login).

Produit-Service: Gestion du catalogue de produits.

Commande-Service: Gestion des achats et calcul du prix total.

RabbitMQ: Broker de messages pour la communication asynchrone.

🛠️ Installation et Lancement
Pour lancer tout l'écosystème avec une seule commande :

Assurez-vous d'avoir Docker Desktop installé.

Clonez le dépôt :

Bash
git clone https://github.com/LAMGAMATE/Microservices-Architecture-with-Node.js-RabbitMQ-Docker.git
Lancez les conteneurs :

Bash
docker-compose up --build
🛣️ API Endpoints
Auth: POST /auth/register | POST /auth/login

Produits: POST /produit/ajouter

Commandes: POST /commande/ajouter (Nécessite un Token JWT)
