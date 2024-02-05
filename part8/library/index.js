const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

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

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
