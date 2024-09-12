import { prismaClient } from '../config/db.js'
import { categoryValidate } from '../validation/category-validation.js'
import { validate } from '../validation/validation.js'

const createCategory = async (req, res) => {
	const category = validate(categoryValidate, req)
	return prismaClient.category.create({
		data: category,
		select: { name: true, id: true },
	})
}
export default { createCategory }
