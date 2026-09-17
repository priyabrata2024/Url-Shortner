const express = require("express");
const path = require("path");

const cors = require("cors");


const pool = require("./db");
const urlRoutes = require("./routes/urlRoute");
const urlController = require("./controllers/urlController");

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend")));

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());


app.use("/api", urlRoutes);

app.get("/:shortCode", urlController.redirectToOriginalUrl);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});