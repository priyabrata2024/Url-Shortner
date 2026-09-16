const express = require("express");

const cors = require("cors");


const pool = require("./db");
const urlRoutes = require("./routes/urlRoute");
const urlController = require("./controllers/urlController");

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "URL Shortener Server Running",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.use("/api", urlRoutes);

app.get("/:shortCode", urlController.redirectToOriginalUrl);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});