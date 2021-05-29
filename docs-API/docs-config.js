import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Library API',
            version: '1.0.0'
        }
    },
    apis: ['./routes/routes.js'],
}

const swaggerDocs = await swaggerJsDoc(swaggerOptions)

export const server = swaggerUI.serve
export const config =  swaggerUI.setup(swaggerDocs)