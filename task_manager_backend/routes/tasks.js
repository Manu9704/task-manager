const express = require('express')
const auth = require('../middleware/auth')
const { createTaskController, getAllTasksController, getTaskByIdController, updateTaskController, deleteTaskController} = require('../controllers/taskControllers')
const admin = require('../middleware/admin')

const router = express.Router()

router.post('/createTask', auth, createTaskController)
router.get('/getAllTasks', auth, getAllTasksController)
router.get('/:id', auth, getTaskByIdController)
router.put('/edit-task/:id', auth, updateTaskController)
router.delete('/deleteTask/:id', auth, admin, deleteTaskController)

module.exports = router