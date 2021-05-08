import BookModel from '../models/bookmodel.js'

export const getBooks = (_, res) => {
    BookModel
        .find({})
        .then(books => res.status(200).json(books))
        .catch(err => {
            const message = "Un problème est survenue lors de la requete veuillez réessayez"
            res.status(500).json({message, data: err})
        }) 
}

export const getBook = (req, res, next) => {
    BookModel
        .findById(req.params.id)
        .then(book => res.status(200).json(book))
        .catch(err => {
            if (Object.keys(err.reason).length === 0 ) {
                res.status(404).json("Aucun livre ne correspond à votre recherche")
            } else {
                next();
            }
            const message = "Un problème est survenue lors de la requête veuillez réessayez"
            res.status(500).json({message, data: err})
        })
}

export const addBook = (req, res, next) => {
    const Book = new BookModel(req.body)
    Book
        .save()
        .then(_ => res.json(`Le livre ${req.body.title} a bien été ajouter`))
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(404).json("Un livre possède déja ce titre")
              } else {
                next();
              }
            const message = "Un problème est survenue lors de la création du livre"
            res.status(500).json({message, data: err})
        })
}

export const updateBook = (req, res) => {
    BookModel
        .findByIdAndUpdate(req.params.id, req.body)
        .then(_ => res.json('Le livre a bien été modifier'))
        .catch(err => {
            if (Object.keys(err.reason).length === 0 ) {
                res.status(404).json("Aucun livre ne correspond à votre recherche")
            } else {
                next();
            }
            res.status(500).json(err)
        })
}

export const deleteBook = (req, res) => {
    BookModel
        .findOneAndDelete(req.params.id)
        .then(_ => res.json('Le livre a bien été supprimer'))
        .catch(err => {
            if (Object.keys(err.reason).length === 0 ) {
                res.status(404).json("Aucun livre ne correspond à votre recherche")
            } else {
                next();
            }
            res.status(500).json(err)
        })
}