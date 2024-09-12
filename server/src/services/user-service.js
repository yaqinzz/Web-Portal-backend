import { prismaClient } from '../config/db.js'
import { ResponseError } from '../error/response-error.js'
import { loginUser, registerUser } from '../validation/user-validation.js'
import { validate } from '../validation/validation.js'
import bcrypt from 'bcrypt'

const register = async req => {
	const user = validate(registerUser, req)

	const countEmail = await prismaClient.user.count({
		where: { email: user.email },
	})

	if (countEmail > 0) {
		throw new ResponseError(400, 'Email already exists')
	}

	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)

	return prismaClient.user.create({
		data: user,
		select: { name: true, email: true, role: true, id: true },
	})
}

const login = async req => {
	const user = validate(loginUser, req)

	const result = await prismaClient.user.findFirst({
		where: { email: user.email },
		select: { id: true, name: true, email: true, password: true, role: true },
	})
	if (!result) {
		throw new ResponseError(401, 'Email or password wrong')
	}

	const match = await bcrypt.compare(user.password, result.password)
	if (!match) {
		throw new ResponseError(401, 'Email or password wrong')
	}

	delete result.password

	return result
}

export default { register, login }
