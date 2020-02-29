const router = require('express').Router()
const messagesController = require('../app/controllers/messagesController')


router.get('/messages', messagesController.list)
router.post('/messages', messagesController.create)


module.exports = router