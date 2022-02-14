const { Schema, model } = require("mongoose");

const artworkSchema = new Schema(
  {
    objectID: Number,
    primaryImage: String,
    objectName: String,
    title: String,
    period: String,
    dimensions: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Artwork", artworkSchema)
