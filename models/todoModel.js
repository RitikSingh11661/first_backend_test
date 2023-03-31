const mongoose = require('mongoose');

const TodoSchema=mongoose.Schema({
    "title":String,
    "status":Boolean,
    "userID":String
})
const TodoModel = mongoose.model('todo',TodoSchema);

module.exports = {TodoModel};
