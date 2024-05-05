var express = require('express');
var router = express.Router();
const msgController = require('../controllers/msgController');


/* GET home page. */
router.get('/', msgController.msg_index);


/* GET/POST message page. */
router.get('/new', msgController.msg_create_get);
router.post("/new", msgController.msg_create_post);


module.exports = router;


