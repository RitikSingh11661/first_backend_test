const mongoosh = require('mongoose')
const connection = mongoosh.connect(process.env.url);

module.exports={connection}