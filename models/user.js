const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email : {
    type: String,
    required: true
  },
  name : String,
  firstName: String,
  lastName: String,
  mob: Number,
  exp: Number,
  achivements: String,
})

module.exports = mongoose.model('User', userSchema)