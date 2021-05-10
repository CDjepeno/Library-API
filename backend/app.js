import express from 'express'
import dotenv from 'dotenv'
import router from './routes/routes.js'

import mongoose from './database/mongoose.js'
const app = express();

/**
 * Middleware
 */
app 
    .use(express.json())
    .use(router)


export default app;