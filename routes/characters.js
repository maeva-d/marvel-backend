const axios = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

// route /characters de type GET

router.get("/characters", async (req, res) => {
  try {
    if (req.query.apiKey === process.env.API_KEY) {
      // Je veux récupérer des données pour les mettre dans mon back...
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
      );
      const data = response.data;
      // ... qui pourront être renvoyées quand le client interrogera la route voulue
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
module.exports = router;
