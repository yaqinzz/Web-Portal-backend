import { prismaClient } from '../config/db.js'
import { ResponseError } from '../error/response-error.js'
import { articleId, articleValidate } from '../validation/article-validation.js'
import { validate } from '../validation/validation.js'

const getAllArticles = async (req, res) => {
	const articles = await prismaClient.article.findMany({
		include: {
			author: { select: { name: true, email: true } },
			category: true,
			tags: { select: { tag: { select: { name: true } } } },
		},
	})

	if (!articles) {
		throw new ResponseError(404, 'Articles not found')
	}
	return articles
}

const getArticleById = async (req, res) => {
	// const { id } = req.params
	const id = validate(articleId, req)
	const article = await prismaClient.article.findUnique({
		where: id,
		include: {
			author: { select: { name: true, email: true } },
			category: true,
			tags: { select: { tag: { select: { name: true } } } },
		},
	})
	if (!article) {
		throw new ResponseError(404, 'Article not found')
	}
	return article
}

const createArticle = async (req, res) => {
	const article = validate(articleValidate, req)

	// Pastikan semua tag ID berupa integer
	const tagIds = article.tags.map(tagId => ({ tagId: parseInt(tagId) }))

	// Buat artikel terlebih dahulu
	const newArticle = await prismaClient.article.create({
		data: {
			title: article.title,
			content: article.content,
			authorId: parseInt(article.authorId),
			categoryId: parseInt(article.categoryId),
		},
	})

	// Sambungkan artikel dengan tag melalui tabel penghubung ArticleTags
	await prismaClient.articleTags.createMany({
		data: tagIds.map(tag => ({
			articleId: newArticle.id,
			tagId: tag.tagId,
		})),
	})

	// Ambil kembali artikel yang dibuat beserta tag yang terhubung
	return await prismaClient.article.findUnique({
		where: { id: newArticle.id },
		include: {
			tags: {
				include: {
					tag: true, // Include informasi tag
				},
			},
		},
	})
}

export default { getAllArticles, createArticle, getArticleById }
