// npm init -y
// npm i express dotenv cors axios
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();

// On fait tourner le serveur local avec npx nodemon

// On importe nos routes
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
// et on les utilise
app.use(charactersRoutes);
app.use(comicsRoutes);

/////////////// On n'y touche pas ///////////////

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
