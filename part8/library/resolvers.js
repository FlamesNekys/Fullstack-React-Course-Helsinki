const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

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

            return Book.find({ author: args.author, genres: [args.genre] }).populate('author')
        },
        allAuthors: async () => {
            return Author.find({})
        },
        me: (root, args, context) => {
            return context.currentUser
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('Token is missing', {
                    extensions: {
                        code: 'BAD_REQUEST',
                    },
                })
            }
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

                pubsub.publish('BOOK_ADDED', { bookAdded: book })

                return book
            }
            existingAuthor.bookCount = existingAuthor.bookCount + 1
            const book = new Book({ ...args, author: existingAuthor._id })
            try {
                await existingAuthor.save()
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error,
                    },
                })
            }

            book.author = existingAuthor

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('Token is missing', {
                    extensions: {
                        code: 'BAD_REQUEST',
                    },
                })
            }
            const author = await Author.findOne({ name: args.name })
            if (!author) return null
            author.born = args.setBornTo
            return author.save()
        },
        createUser: async (root, args) => {
            const user = new User({ ...args })

            try {
                await user.save()
            } catch (error) {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error,
                    },
                })
            }

            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
        },
    },
}

module.exports = resolvers
