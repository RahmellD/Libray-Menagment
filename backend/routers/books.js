const router = require('express').Router()
const { createBook, updateBook, deleteBook, getAllBooks, getBookById, getBook, getBookGenre, search } = require('../controllers/books')
const verifyToken = require('../middlewares/verifyToken')

router.get('/search', verifyToken, search)
router.post('/create', verifyToken, createBook)
router.put('/:id', verifyToken, updateBook)
router.delete('/:id', verifyToken, deleteBook)
router.get('/', verifyToken, getAllBooks)
router.get('/:id', verifyToken, getBookById)
router.get('/book/:id', verifyToken, getBook)
router.get('/books/:genre', verifyToken, getBookGenre)


module.exports = router