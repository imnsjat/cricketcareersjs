const express = require('express');
const router = express.Router();
const homepagecontroller =require('../controllers/homepage');

router.get('/',homepagecontroller.home);

router.post('/player' , homepagecontroller.addPlayer);

router.get('/search' , homepagecontroller.search);

router.get('/edit' , homepagecontroller.edit);


router.get('/edit_:name' , homepagecontroller.editplayer);

router.get('/playerinfo_:name' , homepagecontroller.playerinfo);


module.exports = router ; 
