import BookModel from '../models/bookmodel.js'

export const getBooks = (_, res) => {
    BookModel
        .find({})
        .then(books => res.status(200).json(books))
        .catch(err => res.status(500).json(err))
}

export const getBook = (req, res) => {
    BookModel
        .findById(req.params.id)
        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json(err))
}

export const addBook = (req, res) => {
    const Book = new BookModel(req.body)
    Book
        .save()
        .then(_ => res.json(`Le livre ${req.body.title} a bien été ajouter`))
        .catch(err => res.status(500).json(err))
}

export const updateBook = (req, res) => {
    BookModel
        .findByIdAndUpdate(req.params.id, req.body)
        .then(_ => res.json('Le livre a bien été modifier'))
        .catch(err => res.status(500).json(err))
}

export const deleteBook = (req, res) => {
    BookModel
        .findOneAndDelete(req.params.id)
        .then(_ => res.json('Le livre a bien été supprimer'))
        .catch(err => res.status(500).json(err))
}