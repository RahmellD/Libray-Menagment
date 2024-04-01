const router = require('express').Router()
const { createBook, updateBook, deleteBook, getAllBooks, getBookById, getBookAuthors } = require('../controllers/books')


router.post('/create', createBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)
router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.get('/author/:id', getBookAuthors)


module.exports = router