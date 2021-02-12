import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import EmployeeController from '../controllers/EmployeeController';
import { join } from 'path';
import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


const router = Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads/employees')
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

// Get All Employees
router.get('/', async function(req, res) {
    EmployeeController.getAllEmployees().then(data => {
        res.send(data);
    })
})

// Create new Employee
router.post('/create', async function(req, res) {
    const employee = req.body;
    const empId: String = await EmployeeController.generateEmployeeId();
    employee.empId = empId;
    EmployeeController.addEmployee(employee).then(data => {
        res.send(data)
    })
})

// Get the loggedin employee profile
router.post('/profile', async function(req, res) {
    EmployeeController.getEmployeeAuth(req.body.userName).then(data => {
        res.send(data)
    })
})

// Login with username and password
router.post('/login', async function(req, res) {
    AuthController.login(req.body.userName, req.body.password).then(data => {
        res.send(data);
    })
})

// Get employee details with given id
router.get('/:id', async function(req, res) {
    EmployeeController.getEmployee(req.params.id).then(data => {
        res.send(data);
    })
})

// Upload Image with data
router.post('/uploadFileData/:id', upload.single('image'), async function(req: any, res, next) {    
    const dataObject = JSON.parse(JSON.stringify(req.body));        
    const employee = JSON.parse(dataObject.employee)
    if(!req.file) {
        if(employee.id > 0) {
            const existingData = await EmployeeController.getEmployee(req.params.id);
            employee.image = existingData.image;
        }
        else {
            employee.image='';
        }
    }
    else {
        employee.image = req.file.filename;
    }
    EmployeeController.updateEmployee(req.params.id, employee).then(data => {
        res.send(data)
    })
   
})

//Upadte an Employee
router.put('/:id', async function(req, res) {
    const employee = req.body;
    if(employee.department || employee.worksOn) {
        delete employee.department;
        delete employee.worksOn;
    }
    EmployeeController.updateEmployee(req.params.id, employee).then(data => {
        res.send(data);
    })
})


// Get the employee image
router.get('/employeeImage/:imagename', async function(req, res) {
    return res.sendFile(join(process.cwd()+'/uploads/employees/' + req.params.imagename));
    
})

// Delete an Employee
router.delete('/:id', async function(req, res) {
    EmployeeController.deleteEmployee(req.params.id).then(data => {
        res.send(data);
    })
})


export default router;