const router = require('express').Router()
const { borrowedBook, deletBorrowedBook } = require('../controllers/borrowedBook')
const verifyToken = require('../middlewares/verifyToken')

router.post('/create', verifyToken, borrowedBook)
router.delete('/:id', verifyToken, deletBorrowedBook)

module.exports = router