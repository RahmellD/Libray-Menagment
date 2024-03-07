const router = require('express').Router()
const { createBook, updateBook, deleteBook, addAuthor, getAllBooks, getBookById, getBookAuthors } = require('../controllers/books')
const verifyToken = require('../middlewares/verifyToken')

router.post('/create', verifyToken, createBook)
router.put('/:id',verifyToken, updateBook)
router.delete('/:id',verifyToken, deleteBook)
router.put('/:id/addAuthor', addAuthor)
router.get('/',verifyToken, getAllBooks)
router.get('/:id',verifyToken, getBookById)
router.get('/author/:id',verifyToken, getBookAuthors)


module.exports = router