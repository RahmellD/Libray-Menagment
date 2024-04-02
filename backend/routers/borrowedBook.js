const router = require('express').Router()
const { getAllBooks } = require('../controllers/books')
const { borrowedBook, deletBorrowedBook, getAllBoorowedBooks } = require('../controllers/borrowedBook')
const verifyToken = require('../middlewares/verifyToken')



router.get('/', getAllBoorowedBooks)
router.post('/create', verifyToken, borrowedBook)
router.delete('/:id', verifyToken, deletBorrowedBook)

module.exports = router