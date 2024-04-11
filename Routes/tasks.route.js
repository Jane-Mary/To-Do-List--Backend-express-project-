const { Router } = require('express');
const router = Router();

const tasksController = require('../src/Controllers/task.controller');

router.get('/', tasksController.getAll);//done
router.get('/:id', tasksController.getOneById);//done
router.post('/create', tasksController.create);//done
router.put('/update/:id', tasksController.update);
router.delete('/delete/:id', tasksController.remove);//done

module.exports = router;