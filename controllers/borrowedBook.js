const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const borrowedBook = async (req, res) => {
    try {
        const { userId, bookId, returndate } = req.body;
        const currentDate = new Date();

        // Check if the book is already borrowed
        const existingBorrowedBook = await prisma.borrowedBook.findUnique({
            where: {
                bookId: parseInt(bookId),
            },
        });

        if (existingBorrowedBook) {
            return res.status(400).send('Book already taken');
        }

        // Now proceed with creating a new borrowed book entry
        const book = await prisma.borrowedBook.create({
            data: {
                userId: userId,
                bookId: parseInt(bookId),
                returndate: returndate,
            },
        });

        if (new Date(returndate) < currentDate) {
            return res.status(400).json({ error: "Return date must be today or later." });
        }

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error!');
    }
};


const deletBorrowedBook = async(req, res) =>{
    try {
        const borrowed = await prisma.borrowedBook.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        res.status(200).send('Borrowed Book Deleted')
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error!');
    }
}


module.exports = { borrowedBook, deletBorrowedBook }