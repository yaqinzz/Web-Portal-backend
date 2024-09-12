import express from 'express'
import { publicRouter } from './route/public-route.js'
import { errorMiddleware } from './middleware/error-middleware.js'
import { logger } from './utils/logger.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { api } from './route/api.js'
import { privateRouter } from './route/private.route.js'

dotenv.config()
const web = express()

web.use(express.json())
web.use(cookieParser())

web.use(privateRouter)
web.use(publicRouter)
web.use(api)

web.use(errorMiddleware)

web.listen(3000, () => {
	logger.info('Server running on port 3000')
})
