const City = require('../models/cityModel');
const factory = require('./handlerFactory');

/* USERS ROUTES HANDLERS */
//1. All Cities GET route handler
exports.getAllCities = factory.getAll(City);

//2. City POST route handler
exports.createCity = factory.createOne(City);

//2. City Get route handler
exports.getCity = factory.getOne(City);

//3. City DELETE handler using Function Factory
exports.deleteCity = factory.deleteOne(City);
