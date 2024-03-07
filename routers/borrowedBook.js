const router = require('express').Router()
const { borrowedBook, deletBorrowedBook } = require('../controllers/borrowedBook')
const verifyToken = require('../middlewares/verifyToken')

router.post('/create/:id', verifyToken, borrowedBook)
router.delete('/:id', deletBorrowedBook)

module.exports = router