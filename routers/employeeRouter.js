const employeeRouter = require('express').Router()
const employeeController = require('../controllers/employeeController')
const employeeHashPassword = require('../middleware/extensions/employeeHashPassword')
const authGuard = require('../middleware/services/authGuard')

employeeRouter.get('/addemployee', authGuard, employeeController.displayAddEmployee)
employeeRouter.post('/addEmployee', authGuard,employeeController.addEmployee)
employeeRouter.get('/removeEmployee/:id', authGuard, employeeController.removeEmployee)
employeeRouter.get('/updateEmployee/:id', authGuard, employeeController.displayUpdateEmployee)
employeeRouter.post('/updateEmployee/:id', authGuard, employeeController.updateEmployee)
employeeRouter.get('/employees', authGuard, employeeController.getEmployees)

module.exports = employeeRouter