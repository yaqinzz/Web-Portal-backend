import articleService from '../services/article-service.js'

const createArticle = async (req, res, next) => {
	try {
		const result = await articleService.createArticle(req.body)
		res.status(201).json({ data: result })
	} catch (e) {
		next(e)
	}
}

const getAllArticles = async (req, res, next) => {
	try {
		const result = await articleService.getAllArticles()
		// const filteredResult = result.map(article => {
		// 	delete article.author.password
		// 	return article
		// })
		res.status(200).json({ data: result })
	} catch (e) {
		next(e)
	}
}
const getArticleById = async (req, res, next) => {
	try {
		const result = await articleService.getArticleById(req.params)
		res.status(200).json({ data: result })
	} catch (e) {
		next(e)
	}
}

export default { createArticle, getAllArticles, getArticleById }
