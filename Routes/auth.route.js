const { Router } = require('express');
const router = Router();

const authController = require('../src/Controllers/authController');
const authMiddleware = require('../src/middlewares/auth.middleware')

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;