import { Router } from 'express';
import DepartmentController from '../controllers/DepartmentController';
import { join } from 'path';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads/departments')
    },
    filename: (req, file, cb) => {
        const filename: string = file.originalname.slice(0,file.originalname.lastIndexOf('.')).replace(/\s/g, '') + uuidv4();
        const extension: string = file.originalname.slice(file.originalname.lastIndexOf('.'))
        cb(null, `${filename}${extension}`)
    }
})
const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})


// Get All Departments
router.get('/', async function(req, res) {
    DepartmentController.getAllDepartments().then(data => {
        res.send(data)
    })
})

//Get Department Image
router.get('/departmentImage/:imagename', async function(req, res) {
    return res.sendFile(join(process.cwd()+'/uploads/departments/' + req.params.imagename));    
})

// Get only Departments
router.get('/only', async function(req, res) {
    DepartmentController.getDepartmentsOnly().then(data => {
        res.send(data)
    })    
})

// Get a Department details
router.get('/:id', async function(req, res) {
    DepartmentController.getDepartment(req.params.id).then(data => {
        res.send(data)
    })    
})
// Upload Image with data
router.post('/uploadFileData/:id', upload.single('image'), async function(req: any, res, next) {    
    const dataObject = JSON.parse(JSON.stringify(req.body));        
    const department = JSON.parse(dataObject.department)
    if(!req.file) {
        if(department.id > 0) {
            const existingData = await DepartmentController.getDepartment(req.params.id);
            department.image = existingData.image;
        }
        else {
            department.image='';
        }
    }
    else {
        department.image = req.file.filename;
    }
    

    if( req.params.id >1 ) {
        DepartmentController.updateDepartment(req.params.id, department).then(data => {
            res.send(data)
        })
    }
    else {
        DepartmentController.createDepartment(department).then(data => {
            res.send(data)
        })
    }  
})


// Delete Department with given id
router.delete('/:id', async function(req, res) {
    DepartmentController.deleteDepartment(req.params.id).then(data => {
        res.send(data)
    })
})



export default router;
