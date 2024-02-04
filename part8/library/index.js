const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const Author = require('./schema/author')
const Book = require('./schema/book')
const { GraphQLError } = require('graphql')
mongoose.set('strictQuery', false)
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL

console.log('connecting to', MONGODB_URL)

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = `
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Query {
        authorsCount: Int!
        booksCount: Int!
        allBooks(author: String genre: String): [Book!]!
        allAuthors: [Author!]! 
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book
    editAuthor(name: String! setBornTo: Int!): Author
  }
`

const resolvers = {
    Query: {
        authorsCount: async () => Author.collection.countDocuments(),
        booksCount: async () => Book.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (!args.author && !args.genre) return Book.find({}).populate('author')

            if (args.author && !args.genre) {
                return Book.find({ author: args.author }).populate('author')
            }
            if (args.genre && !args.author) {
                return Book.find({ genres: [args.genre] }).populate('author')
            }

            return Book.find({ author: args.author, genres: [args.genre] })
        },
        allAuthors: async () => Author.find({}),
    },
    Author: {
        bookCount: async (root) => {
            return Book.countDocuments({ author: root._id })
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            const existingAuthor = await Author.findOne({ name: args.author })
            if (!existingAuthor) {
                const nonExistedAuthor = new Author({ name: args.author, bookCount: 1 })
                const newAuthor = await nonExistedAuthor.save()
                const book = new Book({ ...args, author: newAuthor._id })
                try {
                    await book.save()
                } catch (error) {
                    throw new GraphQLError('Saving book failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.title,
                            error,
                        },
                    })
                }

                book.author = nonExistedAuthor
                return book
            }
            const book = new Book({ ...args, author: existingAuthor._id })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error,
                    },
                })
            }

            book.author = existingAuthor
            return book
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            if (!author) return null
            author.born = args.setBornTo
            return author.save()
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
