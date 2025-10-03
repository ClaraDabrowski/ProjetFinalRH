const computerRouter = require('express').Router()
const computerController = require('../controllers/computerController')
const authGuard = require ("../middleware/services/authGuard")

computerRouter.get('/addComputer',authGuard, computerController.displayAddComputer)
computerRouter.post('/addComputer',authGuard, computerController.addComputer)


module.exports = computerRouter