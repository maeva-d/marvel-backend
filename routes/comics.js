const axios = require("axios");
const express = require("express");
const router = express.Router();

require("dotenv").config();

//// route GET pour avoir la liste des comics
router.get("/comics", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    const title = req.query.title || "";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${title}&page=${page}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.message === "Your apiKey is not valid") {
      return res.status(400).json({ message: "apiKey is not valid." });
    } else {
      return res.status(500).json({ message: error.message });
    }
  }
});

//// route GET pour récupérer tous les comics dans lequel un personnage apparaît
router.get("/comics/:characterId", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    // console.log(req.query);
    // console.log(req.params);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}&page=${page}`
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

// //// route GET pour récupérer des infos sur UN comics précis (comic sans S!)

router.get("/comic/:comicId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
