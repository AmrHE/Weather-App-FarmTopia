const mongoose = require('mongoose');

//Create products Mongoose Schema
const citySchema = new mongoose.Schema(
  //Schema definition object
  {
    name: {
      type: String,
      required: [true, 'Please enter a valid city name'],
      unique: true,
      trim: true,
    },
    url: String,
  }
);

citySchema.pre('save', function (next) {
  this.url = `http://api.openweathermap.org/data/2.5/weather?q=${this.name}&appid=0e30663205a1ab74be2c53c7796c8c3d`;
  next();
});

const City = mongoose.model('City', citySchema);

module.exports = City;
