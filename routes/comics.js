const axios = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

//// route GET pour avoir la liste des comics
// Il faut tester avec localhost sur postman les routes pour voir si les requêtes fonctionnent
router.get("/comics", async (req, res) => {
  try {
    if (req.query.apiKey === process.env.API_KEY) {
      // On mets des paramètres par défaut !!
      const limit = req.query.limit || 100;
      const skip = req.query.skip || 0;
      const title = req.query.name || "";
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
      );
      // console.log(response.data); OK !
      const data = response.data;
      return res.status(200).json(data);
    } else {
      return res.status(401).json("Access denied: you need a valid API key.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// route GET pour récupérer tous les comics dans lequel un personnage apparaît

router.get("/comics/:characterId", async (req, res) => {
  try {
    // console.log(req.query);
    // console.log(req.params);
    if (req.query.apiKey === process.env.API_KEY) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
      );
      const data = response.data;
      // console.log("data =>", data);
      return res.status(200).json(data);
    } else {
      return res.status(401).json("Access denied: you need a valid API key.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//// route GET pour récupérer des infos sur UN comics précis (comic sans S!)

router.get("/comic/:comicId", async (req, res) => {
  try {
    console.log(req.query);
    console.log(req.params);
    if (req.query.apiKey === process.env.API_KEY) {
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
      );
      const data = response.data;
      // console.log("comic data =>", data);
      return res.status(200).json(data);
    } else {
      return res.status(401).json("Access denied: you need a valid API key.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
