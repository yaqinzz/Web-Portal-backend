import userService from '../services/user-service.js'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'

const register = async (req, res, next) => {
	try {
		const result = await userService.register(req.body)
		generateTokenAndSetCookie(result.id, res)
		delete result.id
		res.status(200).json({
			message: 'Register success',
			data: result,
		})
	} catch (e) {
		next(e)
	}
}

const login = async (req, res, next) => {
	try {
		const result = await userService.login(req.body)
		generateTokenAndSetCookie(result.id, res)
		delete result.id
		res.status(200).json({
			message: 'Login successfully',
			data: result,
		})
	} catch (e) {
		next(e)
	}
}
const logout = (req, res) => {
	res.clearCookie('jwt')
	res.status(200).json({ message: 'Logout success' })
}

export default { register, login, logout }
