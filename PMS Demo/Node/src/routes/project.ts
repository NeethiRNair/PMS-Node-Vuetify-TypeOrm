import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';


const router = Router();

// Get All Projects
router.get('/', async function(req, res) {
    ProjectController.getAllProjects().then(data => {
        res.send(data)
    })
})

// Get Project with given project code
router.get('/:id', async function(req, res) {
    ProjectController.getProjectDetails(req.params.id).then(data => {
        res.send(data)
    })
})

export default router;