import { getBooks }  from '../controllers/bookController.js'

// const getBooks = require('../controllers/bookController')


describe('/GET Books', () => {
    it('should get all books with a status of 200', async() => {
        const result = await getBooks()
        console.log('result', result)
    })
})