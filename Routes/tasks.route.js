const { Router } = require('express');
const router = Router();
const taskMiddleware = require('../src/middlewares/task.middleware')
const tasksController = require('../src/Controllers/task.controller');
const authMiddleware = require('../src/middlewares/auth.middleware')


router.get('/',authMiddleware.auth, tasksController.getAll);//done
router.get('/:id', tasksController.getOneById);//done
router.post('/create', taskMiddleware.verifyCreateRequest , tasksController.create);//done
router.put('/update/:id', tasksController.update);
router.delete('/delete/:id', tasksController.remove);//done

module.exports = router;