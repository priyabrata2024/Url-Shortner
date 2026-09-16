const urlRepository = require("../repo/urlRepo");
const generateShortCode = require("../util/short-code");

const createShortUrl = async (originalUrl) => {
  if (!originalUrl) {
    throw new Error("Original URL is required");
  }

  let shortCode;
  let savedUrl;

  while (!savedUrl) {
    shortCode = generateShortCode();

    try {
      savedUrl = await urlRepository.createUrl(
        shortCode,
        originalUrl
      );
    } catch (error) {
      if (error.code !== "23505") {
        throw error;
      }
    }
  }

  return {
    id: savedUrl.id,
    shortCode: savedUrl.short_code,
    originalUrl: savedUrl.original_url,
    shortUrl: `http://localhost:3000/${savedUrl.short_code}`,
  };
};

const getOriginalUrl = async (shortCode) => {
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    throw new Error("Short URL not found");
  }

  return url.original_url;
};

module.exports = {
  createShortUrl,
  getOriginalUrl,
};