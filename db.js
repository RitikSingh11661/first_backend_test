const mongoosh = require('mongoose')
require('dotenv').config()
const connection = mongoosh.connect(process.env.url);

module.exports={connection}