const express = require('express')
const router = express.Router()
const User = require("../models/user")

// All User Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.email != null && req.query.email !== '') {
    searchOptions.email = new RegExp(req.query.email, 'i')
  }
  try {
    const users = await User.find(searchOptions)
    res.render('users/index', {
      users: users,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New user Route
router.get('/new', (req, res) => {
  res.render('users/new', { user: new User() })
})

// Create New user Route
router.post('/', async (req, res) => {
  const {email, firstName, lastName, name, mob, exp, ach } = req.body;
  const user = new User({
    email:email,
    firstName,
    lastName,
    name,
    mob,
    exp,
    achivements : ach
  })
  try {
    console.log();
    const newUser = await user.save()
    res.redirect(`users/${newUser.id}`)
  } catch {
    res.render('users/new', {
      user: user,
      errorMessage: 'Invalid Data Entered'
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.render('users/show', {
      user: user,
    })
  } catch {
    res.redirect('/')
  }
})

module.exports = router