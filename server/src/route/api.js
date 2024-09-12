import express from 'express'
import authController from '../controllers/auth-controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const api = express.Router()
api.post('/api/auth', authMiddleware, authController.refreshToken)
api.get('/api/me', authMiddleware, (req, res) => {
	res.status(200).json('tesss')
})
export { api }
