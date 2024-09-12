import jwt from 'jsonwebtoken'
import { ResponseError } from '../error/response-error.js'
// import { generateToken } from '../utils/tokenUtils.js'
import { prismaClient } from '../config/db.js'

const refreshToken = async req => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (!token) {
		throw new ResponseError(401, 'Unauthorized')
	}

	// Find the user with the given access token
	const user = await prismaClient.user.findFirst({
		where: { acces_token: token },
		select: { refresh_token: true, username: true, name: true, email: true },
	})

	if (!user) {
		throw new ResponseError(401, 'Unauthorized')
	}

	const { refresh_token: refreshToken } = user

	// Verify the refresh token
	const decoded = await new Promise((resolve, reject) => {
		jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
			if (err) {
				return reject(new ResponseError(401, 'Please login again'))
			}
			resolve(decoded)
		})
	})

	const { user: userData } = decoded

	// Generate a new access token
	const accessToken = generateToken(userData)

	// Update the user with the new access token
	try {
		const updatedUser = await prismaClient.user.update({
			where: { username: userData.username },
			data: { acces_token: accessToken },
			select: { name: true, username: true, email: true, acces_token: true },
		})
		return updatedUser
	} catch (updateError) {
		throw new ResponseError(500, 'Internal Server Error')
	}
}

export default { refreshToken }
