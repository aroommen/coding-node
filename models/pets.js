const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema ({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model('Pet', PetSchema);