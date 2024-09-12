import jwt from 'jsonwebtoken'
import { ResponseError } from '../error/response-error.js'

export const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers('authorization')
		const token = authHeader && authHeader.split(' ')[1]
		if (!token) {
			throw new ResponseError(401, 'Unauthorized')
		}

		jwt.verify(token, process.env.SECRET_KEY, err => {
			if (err) {
				throw new ResponseError(401, 'Please login again')
			}
			// req.user = user
			next()
		})
	} catch (e) {
		next(e)
	}
}
