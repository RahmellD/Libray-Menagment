const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//Create User
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }

        })
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}


//Update user
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await prisma.user.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                name,
                email,
                password
            }
        })
        res.status(200).send("User updated successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//delete user
const deleteUser = async (req, res) => {
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.json(deleteUser)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//get all users
const getAllUsers = async (req, res) => {
    try {
        const getUsers = await prisma.user.findMany({})

        res.json(getUsers)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//get user by id
const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//Login API
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        if (user) {
            const validPass = await bcrypt.compare(password, user.password)
            if (validPass) {
                const token = await jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: '10m'
                })
                res.json(token)
            }
            else {
                res.status(400).send('Invalid Credentials');
            }

        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

module.exports = { createUser, updateUser, deleteUser, getAllUsers, getUser, login }