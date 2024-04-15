const { PrismaClient } = require('@prisma/client')
const e = require('express')
const prisma = new PrismaClient()

//create book
const createBook = async (req, res) => {
    try {
        const { title, genre, price, published, author_name } = req.body
        const isoPublished = new Date(published).toISOString();
        const book = await prisma.book.create({
            data: {
                title,
                genre,
                price,
                published: isoPublished,
                author_name,

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



//get all boks
const getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const itemsPerPage = 3
        const skip = (page - 1) * itemsPerPage
        const books = await prisma.book.findMany({
            skip: skip,
            take: itemsPerPage
        })
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


const getBook = async (req, res) => {
    try {
        const books = await prisma.book.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                borrowedBook: {
                    select: {
                        returndate: true,
                        userId: true
                    }
                },

            }
        })
        res.json(books)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!')
    }
}


const search = async (req, res) => {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({ error: 'Search parameter is missing' });
        }

        const result = await prisma.book.findMany({
            where: {
                OR: [
                    { title: { contains: search } },
                    { author_name: { contains: search } },
                    { genre: { contains: search } }
                ]
            }

        });

        res.json(result);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).send('Internal server error!');
    }
}



module.exports = { createBook, updateBook, deleteBook, getAllBooks, getBookById, getBook, search }