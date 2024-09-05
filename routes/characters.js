const axios = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

// route /characters de type GET

router.get("/characters", async (req, res) => {
  try {
    if (req.query.apiKey === process.env.API_KEY) {
      // console.log(req.query)
      // On met des paramètres par défaut grâce au || !! si une des valeurs est null alors c'est l'autre qui sera prise en compte
      const limit = req.query.limit || 100;
      const skip = req.query.skip || 0;
      const name = req.query.name || "";

      // Je veux récupérer des données pour les mettre dans mon back...
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
      );
      const data = response.data;
      // ... qui pourront être renvoyées quand le client interrogera la route voulue
      return res.status(200).json(data);
    } else {
      return res.status(401).json("Access denied: you need a valid API key.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//
module.exports = router;
