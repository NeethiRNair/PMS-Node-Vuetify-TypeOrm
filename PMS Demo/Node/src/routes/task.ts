import { Router } from 'express';
import TaskController from '../controllers/TaskController';


const router = Router();

// Get Task with given id
router.get('/:id', async function(req, res) {
    TaskController.getTaskDetails(req.params.id).then(data => {
        res.send(data)
    })
})

// Update Task with given id
router.put('/:id', async function(req, res) {
    TaskController.updateTask(req.params.id, req.body).then(data => {
        res.send(data)
    })
})

// Get All Tasks Assigned to an employee with given id
router.get('/assigned/:id', async function(req, res) {
    TaskController.assignedToMeTasks(req.params.id).then(data => {
        res.send(data)
    })
})

// Get All Tasks Created by an employee with given id
router.get('/created/:id', async function(req, res) {
    TaskController.createdByMeTasks(req.params.id).then(data => {
        res.send(data)
    })
})

// Add a new Task
router.post('/create', async function(req, res) {
    TaskController.createTask(req.body).then(data => {
        res.send(data)
    })
})

export default router;