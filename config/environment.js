const path = require('path');
const dotenv = require('dotenv');

module.exports = {
    config: dotenv.config({path: path.resolve(__dirname, '../.env')}).parsed,
    development: dotenv.config({path: path.resolve(__dirname, '../.env.development')}).parsed,
    testing: dotenv.config({path: path.resolve(__dirname, '../.env.testing')}).parsed,
    production: dotenv.config({path: path.resolve(__dirname, '../.env.production')}).parsed,
};