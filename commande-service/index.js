const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Commande = require("./Commande");

const jwt = require("jsonwebtoken"); 

const app = express();
const PORT = 4001;

mongoose.connect("mongodb://mongodb/commande-service")
    .then(() => console.log("DB connectée"))
    .catch(err => console.log(err));

app.use(express.json());


function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; t++) {
        total += produits[t].prix;
    }
    console.log("prix total :" + total);
    return total;
}

async function httpRequest(ids) {
    try {
        const response = await axios.post("http://produit-service:4000/produit/acheter", { ids });
        return prixTotal(response.data);
    } catch (error) {
        console.log(error);
    }
}


function isAuthenticated(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Utilisateur non autorisé" });

    jwt.verify(token, "SECRET_KEY", (err, user) => {
        if (err) return res.status(403).json({ message: "Token non valide" });
        req.user = user;
        next();
    });
}


app.post("/commande/ajouter", isAuthenticated, async (req, res, next) => {
    const { ids } = req.body;
    
    httpRequest(ids).then(total => {
        const newCommande = new Commande({
            produits: ids,
            email_utilisateur: req.user.email, 
            prix_total: total,
        });
        
        newCommande.save()
            .then(commande => res.status(201).json(commande))
            .catch(error => res.status(400).json({ error }));
    });
});



app.listen(PORT, () => {
    console.log(`Commande-Service sur port ${PORT}`);
});


