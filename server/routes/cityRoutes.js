const express = require('express');
const cityController = require('../controllers/cityController');

const router = express.Router();

router
  .route('/')
  .get(cityController.getAllCities)
  .post(cityController.createCity);

router
  .route('/:name')
  .get(cityController.getCity)
  .delete(cityController.deleteCity);

module.exports = router;
