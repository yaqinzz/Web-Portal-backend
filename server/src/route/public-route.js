import express from 'express'
import userController from '../controllers/user-controller.js'

const publicRouter = express.Router()
publicRouter.post('/api/register', userController.register)

publicRouter.post('/api/login', userController.login)
publicRouter.delete('/api/logout', userController.logout)

export { publicRouter }
