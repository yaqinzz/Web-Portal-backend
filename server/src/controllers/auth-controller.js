import authService from '../services/auth-service.js'

const refreshToken = async (req, res, next) => {
	try {
		const result = await authService.refreshToken(req)

		res.cookie('token', result, { httpOnly: true })
		res.status(200).json({ message: 'Refresh token success', data: result })
	} catch (e) {
		next(e)
	}
}

export default { refreshToken }
