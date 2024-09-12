import categoryService from '../services/category-service.js'

const createCategory = async (req, res, next) => {
	try {
		const result = await categoryService.createCategory(req.body)
		res.status(201).json({ data: result })
	} catch (error) {
		next(error)
	}
}
export default { createCategory }
