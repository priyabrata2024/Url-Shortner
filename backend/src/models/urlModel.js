const urlModel = {
  id: {
    column: "id",
    type: "BIGINT",
  },

  shortCode: {
    column: "short_code",
    type: "VARCHAR",
    length: 20,
  },

  originalUrl: {
    column: "original_url",
    type: "TEXT",
  },

  createdAt: {
    column: "created_at",
    type: "TIMESTAMP",
  },
};

module.exports = urlModel;