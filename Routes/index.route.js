const { Router } = require('express');
const router = Router();

const indexController = require('../src/Controllers/index.controller');

router.get('/', indexController.index);

module.exports = router;