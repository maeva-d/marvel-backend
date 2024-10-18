const axios = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

router.get("/characters", async (req, res) => {
  try {
    // console.log(req.query)
    // On met des paramètres par défaut grâce au || !! si une des valeurs est falsy alors c'est l'autre qui sera prise en compte
    const limit = req.query.limit || 100;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    const name = req.query.name || "";

    // Je veux récupérer des données pour les mettre dans mon back...
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&name=${name}&page=${page}`
    );
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    if (error.message === "Your apiKey is not valid") {
      return res.status(400).json({ message: "apiKey is not valid." });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
