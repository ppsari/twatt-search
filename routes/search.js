var express = require('express');
var router = express.Router();
const search_controllers = require('../controllers/search_controllers');

/* GET users listing. */

router.post('/', search_controllers.showAll);

module.exports = router;
