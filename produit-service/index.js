const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
const jwt = require("jsonwebtoken");


const Produit = require("./Produit");


app.use(express.json());


mongoose.connect("mongodb://mongodb/produit-service")
  .then(() => console.log("DB connectée"))
  .catch(err => console.log("Erreur :", err));



function isAuthenticated(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Utilisateur non autorisé" });

    jwt.verify(token, "SECRET_KEY", (err, user) => {
        if (err) return res.status(403).json({ message: "Token non valide" });
        req.user = user;
        next();
    });
}



app.post("/produit/ajouter", isAuthenticated, async (req, res) => {
  try {
    const { nom, description, prix } = req.body;
    const produit = new Produit({ nom, description, prix });
    await produit.save();
    res.status(201).json(produit);
  } catch (error) {
    res.status(400).json({ error });
  }
});


app.post("/produit/acheter", async (req, res) => {
  try {
    const { ids } = req.body; 
    const produits = await Produit.find({ _id: { $in: ids } });
    
    res.json(produits);
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});



app.listen(PORT, () => {
  console.log(`Produit-Service sur port ${PORT}`);
});