const computerRouter = require('express').Router()
const computerController = require('../controllers/computerController')
const authGuard = require ("../middleware/services/authGuard")

computerRouter.get('/addComputer', authGuard, computerController.displayAddComputer)
computerRouter.post('/addComputer', authGuard, computerController.addComputer)
computerRouter.get('/computers', authGuard, computerController.displayComputers)
computerRouter.get('/updateComputer/:id', authGuard, computerController.displayUpdateComputer)
computerRouter.post('/updateComputer/:id', authGuard, computerController.updateComputer)
computerRouter.get('/removeComputer/:id', authGuard, computerController.removeComputer)

module.exports = computerRouter