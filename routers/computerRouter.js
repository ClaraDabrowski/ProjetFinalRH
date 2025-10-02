const computerRouter = require('express').Router()
const computerController = require('../controllers/computerController')


computerRouter.get('/addComputer', computerController.displayAddComputer)
computerRouter.post('/addComputer', computerController.addComputer)

module.exports = computerRouter