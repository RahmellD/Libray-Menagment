const router = require('express').Router()
const { createBook, updateBook, deleteBook, getAllBooks, getBookById, getBook } = require('../controllers/books')
const { getUsersBook } = require('../controllers/borrowedBook')
const verifyToken = require('../middlewares/verifyToken')


router.post('/create', verifyToken, createBook)
router.put('/:id', verifyToken, updateBook)
router.delete('/:id', verifyToken, deleteBook)
router.get('/', verifyToken, getAllBooks)
router.get('/:id', verifyToken, getBookById)
router.get('/book/:id', verifyToken, getBook)


module.exports = router