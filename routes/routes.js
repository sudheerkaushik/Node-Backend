const express = require('express'),
    app = express(),
    router = express.Router(),
    main_controller = require('../controllers/main.handler');

//*************** bestseller_books ***************
router.get("/", main_controller.get_db);

module.exports = router;