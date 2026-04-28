const mongoose = require("mongoose");

const ProduitSchema = mongoose.Schema({
    nom: String,
    description: String,
    prix: Number,
    created_at: {
        type: Date,
        default: Date.now, 
    },
});

module.exports = mongoose.model("produit", ProduitSchema);