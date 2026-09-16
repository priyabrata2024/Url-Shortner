const pool = require("../db");

const createUrl = async (shortCode, originalUrl) => {
  const query = `
    INSERT INTO urls (short_code, original_url)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [shortCode, originalUrl];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const findByShortCode = async (shortCode) => {
  const query = `
    SELECT *
    FROM urls
    WHERE short_code = $1;
  `;

  const result = await pool.query(query, [shortCode]);

  return result.rows[0];
};

module.exports = {
  createUrl,
  findByShortCode,
};