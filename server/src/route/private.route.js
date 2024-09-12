import express from 'express'
import categoryController from '../controllers/category-controller.js'
import articleController from '../controllers/article-controller.js'
const privateRouter = express.Router()

//ARTICLE
privateRouter.get('/api/article', articleController.getAllArticles)
privateRouter.get('/api/article/:id', articleController.getArticleById)
privateRouter.post('/api/article', articleController.createArticle)

//CATEGORY
privateRouter.post('/api/category', categoryController.createCategory)

export { privateRouter }
