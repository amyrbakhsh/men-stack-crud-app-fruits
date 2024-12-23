// models/fruit.js

const mongoose = require('mongoose');
//1 create the schema
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

//register the model
const Fruit = mongoose.model('Fruit',fruitSchema)

//share it with the rest of the app

module.exports = Fruit;
