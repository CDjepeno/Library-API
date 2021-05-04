import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/routes.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express();

/**
 * Connect MongoDB
 */
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

/**
 * Middleware
 */
app 
    .use(express.json())
    .use(router)

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})