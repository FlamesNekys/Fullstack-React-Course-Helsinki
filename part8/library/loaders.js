const DataLoader = require('dataloader')
const Book = require('./models/book')

const batchBooksCount = async (keys) => {
    const books = await Book.find({ author: keys })

    const result = keys.map((key) => books.find((book) => book.author === key))
    console.log(result)

    return result
}

const booksCountLoader = new DataLoader((authorIds) => batchBooksCount(authorIds))

module.exports = { booksCountLoader }
