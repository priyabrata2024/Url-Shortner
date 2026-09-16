const urlService = require("../services/urlService");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const result = await urlService.createShortUrl(originalUrl);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);

    if (error.message === "Original URL is required") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const originalUrl = await urlService.getOriginalUrl(shortCode);

    res.redirect(originalUrl);
  } catch (error) {
    if (error.message === "Short URL not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
};