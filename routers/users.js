const router = require('express').Router()
const verifyToken = require('../middlewares/verifyToken')
const { createUser, updateUser, deleteUser, getAllUsers, getUser, login } = require('../controllers/users')

router.get('/', verifyToken, getAllUsers)
router.post('/create',createUser)
router.put('/:id', verifyToken,updateUser)
router.delete('/:id',verifyToken, deleteUser)
router.get('/:id', verifyToken, getUser)
router.post('/login', login)

module.exports = router 