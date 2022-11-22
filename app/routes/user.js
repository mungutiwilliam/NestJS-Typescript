const express = require('express');
const router = express.Router();


const {addUser, loginUser, getUser} = require('../controllers/user')



router.post('/add-User', addUser);


router.get('/', getUser);


module.exports = router;