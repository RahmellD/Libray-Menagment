const router = require('express').Router()
const { borrowedBook, deletBorrowedBook, getAllBoorowedBooks, getUsersBook, updateBoroowedBook, searchBook } = require('../controllers/borrowedBook')
const verifyToken = require('../middlewares/verifyToken')


router.get('/search', verifyToken, searchBook)
router.get('/',verifyToken, getAllBoorowedBooks)
router.get('/:id', verifyToken, getUsersBook)
router.post('/create', verifyToken, borrowedBook)
router.put('/:id', verifyToken, updateBoroowedBook)
router.delete('/:id', verifyToken, deletBorrowedBook)

module.exports = router