const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//create borrowed book
const borrowedBook = async (req, res) => {
    try {
        const { userId, bookId, returndate } = req.body;
        const currentDate = new Date();
        const isoPublished = new Date(returndate).toISOString();

        // Check if the book is already borrowed
        const existingBorrowedBook = await prisma.borrowedBook.findUnique({
            where: {
                bookId: parseInt(bookId),
            },
        });

        if (existingBorrowedBook) {
            return res.status(400).send('Book already taken');
        }


        if (new Date(returndate) < currentDate) {
            return res.status(400).send("Return date must be today or later.");
        }


        // Now proceed with creating a new borrowed book entry
        const book = await prisma.borrowedBook.create({
            data: {
                userId: userId,
                bookId: parseInt(bookId),
                returndate: isoPublished,
            },
        });

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error!');
    }
};

//delete borowed book
const deletBorrowedBook = async (req, res) => {
    try {
        const borrowed = await prisma.borrowedBook.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.status(200).send('Borrowed Book Deleted')
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error!');
    }
}

//update book
const updateBoroowedBook = async (req, res) => {
    try {
        const { bookId, userId, returndate } = req.body
        const book = await prisma.borrowedBook.update({
            where: {
                id: req.params.id
            },
            data: {
                bookId,
                userId,
                returndate
            }
        })
        res.json(book)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error!');
    }

}

//find all borowed books
const getAllBoorowedBooks = async (req, res) => {
    try {
        const books = await prisma.borrowedBook.findMany({
        })
        res.status(200).send(books)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!')
    }
}


//get book and user that borrowed that book
const getUsersBook = async (req, res) => {
    try {
        const books = await prisma.borrowedBook.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
        res.json(books)
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error!')
    }
}

const searchBook = async (req, res) => {
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
            },
            include: {
                borrowedBook: {
                    select: {
                        returndate: true,
                        user: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    },

                },

            },

        });

        res.json(result);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).send('Internal server error!');
    }
}



module.exports = { borrowedBook, deletBorrowedBook, updateBoroowedBook, getAllBoorowedBooks, getUsersBook, searchBook }