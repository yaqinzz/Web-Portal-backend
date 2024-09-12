import Joi from 'joi'
const registerUser = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().required().min(6),
	role: Joi.string(),
})

const loginUser = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().required(),
})

export { registerUser, loginUser }
