const express = require('express');
const router = express.Router();
const homepagecontroller =require('../controllers/homepage');

router.get('/',homepagecontroller.home);

module.exports = router ; 
