import Joi from 'joi'

const articleValidate = Joi.object({
	title: Joi.string().required(),
	content: Joi.string().required(),
	authorId: Joi.number().required(),
	categoryId: Joi.number().required(),
	tags: Joi.array().required(),
})
const articleId = Joi.object({
	id: Joi.number().required(),
})

export { articleValidate, articleId }
