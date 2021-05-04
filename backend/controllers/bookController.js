import BookModel from '../models/bookmodel'

export const getBooks = (_, res) => {
    BookModel
        .find({})
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(500).json(err))
}

export const getBook = (req, res) => {
    BookModel
        .find(req.params.id)
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(500).json(err))
}

export const addBook = (req, res) => {
    const Book = new BookModel(req.body)
    BookModel
        .save()
        .then(response => res.json('Le livre a bien été ajouter'))
        .catch(err => res.status(500).json(err))
}

export const updateBook = (req, res) => {
    BookModel
        .findOneAndUpdate(req.params.id, req.body)
        .then(response => res.json('Le livre a bien été modifier'))
        .catch(err => res.status(500).json(err))
}

export const deleteBook = (req, res) => {
    BookModel
        .findOneAndDelete(req.params.id)
        .then(response => res.json('Le livre a bien été supprimer'))
        .catch(err => res.status(500).json(err))
}