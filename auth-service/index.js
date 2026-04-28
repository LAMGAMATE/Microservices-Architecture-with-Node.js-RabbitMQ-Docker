const express = require("express");
const app = express();
const PORT = 4002;
const mongoose = require("mongoose");
const Utilisateur = require("./utilisateur"); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://mongodb/auth-service")
  .then(() => console.log("DB connectée"))
  .catch(err => console.log(err));

app.use(express.json());


app.post("/auth/register", async (req, res) => {
  let { nom, email, mot_passe } = req.body;
  try {
    const userExists = await Utilisateur.findOne({ email });
    if (userExists) {
      return res.json({ message: "Utilisateur déjà existant" });
    }


    const hash = await bcrypt.hash(mot_passe, 10);
    const newUtilisateur = new Utilisateur({
      nom,
      email,
      mot_passe: hash
    });

    const savedUser = await newUtilisateur.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});


app.post("/auth/login", async (req, res) => {
  const { email, mot_passe } = req.body;
  try {
    const user = await Utilisateur.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }


    const isMatch = await bcrypt.compare(mot_passe, user.mot_passe);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "SECRET_KEY", 
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Auth-Service sur port ${PORT}`);
});