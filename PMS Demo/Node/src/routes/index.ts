import { Router } from 'express';
import  Project  from './project';
import  Employee  from './employee';
import  Task  from './task';
import  Department  from './department';

const router = Router();

// Defining all the different routes 

router.use('/projects', Project);
router.use('/employees', Employee);
router.use('/tasks', Task);
router.use('/departments', Department);

export default router;