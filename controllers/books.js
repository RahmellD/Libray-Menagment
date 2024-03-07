const { PrismaClient } = require('@prisma/client')
const e = require('express')
const prisma = new PrismaClient()

//create book
const createBook = async (req, res) => {
    try {
        const { title, genre, price, published, ISBN, authorId } = req.body
        const book = await prisma.book.create({
            data: {
                title,
                genre,
                price,
                published,
                ISBN,
                authorId
            }
        })
        res.json(book)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
}

//update book
const updateBook = async (req, res) => {
    try {
        const { title, genre, price, published } = req.body
        const book = await prisma.book.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                title,
                genre,
                price,
                published

            }
        })
        res.status(200).send("Book updated successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//delete book
const deleteBook = async (req, res) => {
    try {
        const book = await prisma.book.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.json(book)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//add author to book
const addAuthor = async (req, res) => {
    try {
        const book = await prisma.book.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                authorId
            }
        })
        res.json(book)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//get all boks
const getAllBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany({})
        res.json(books)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//get book by id
const getBookById = async (req, res) => {
    try {
        const book = prisma.book.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.json(book)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}

//get books and authors
const getBookAuthors = async (req, res) => {
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.json(book)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!');
    }
}


module.exports = { createBook, updateBook, deleteBook, addAuthor, getAllBooks, getBookById, getBookAuthors }