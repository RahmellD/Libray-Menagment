const router = require('express').Router()
const { createBook, updateBook, deleteBook, getAllBooks, getBookById, getBookAuthors } = require('../controllers/books')
const verifyToken = require('../middlewares/verifyToken')

router.post('/create', createBook)
router.put('/:id',verifyToken, updateBook)
router.delete('/:id',verifyToken, deleteBook)
router.get('/', getAllBooks)
router.get('/:id',verifyToken, getBookById)
router.get('/author/:id',verifyToken, getBookAuthors)


module.exports = router