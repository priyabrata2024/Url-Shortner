const CHARACTERS =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateShortCode = (length = 8) => {
  let shortCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);

    shortCode += CHARACTERS[randomIndex];
  }

  return shortCode;
};

module.exports = generateShortCode;