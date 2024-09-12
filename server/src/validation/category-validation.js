import Joi from 'joi'
const categoryValidate = Joi.object({
	name: Joi.string().required(),
})

export { categoryValidate }
