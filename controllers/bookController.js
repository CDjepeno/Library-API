import BookModel from "../models/bookModel.js";

export const getBooks = (_, res) => {
  return BookModel.find({})
    .then((books) => res.status(200).json(books))
    .catch((err) => {
      const message =
        "Un problème est survenue lors de la requete veuillez réessayez";
      res.status(500).json({ message, data: err });
    });
};

export const getOneBook = (req, res, next) => {
  return BookModel.findById(req.params.id)
    .then((book) => res.status(200).json(book))
    .catch((err) => {
      if (err.messageFormat === undefined) {
        return res
          .status(404)
          .json("Aucun livre ne correspond à votre recherche");
      } else {
        const message =
          "Un problème est survenue lors de la requête veuillez réessayez";
        res.status(500).json({ message, data: err });
        next();
      }
    });
};

export const addBook = (req, res, next) => {
  const Book = new BookModel(req.body);
  Book.save()
    .then((book) => res.status(201).json(book))
    .catch((err) => {
      if (err.name === "MongoNetworkError" || err.code === 11000) {
        return res.status(404).json("Un livre possède déja ce titre");
      } else if (err.name === "ValidationError") {
        return res
          .status(404)
          .json(
            "Vous avez oubliez de remplir un champ ou un champ n'est pas remplis correctement"
          );
      } else {
        const message = "Un problème est survenue lors de la création du livre";
        res.status(500).json({ message, data: err });
        next();
      }
    });
};

export const updateBook = (req, res) => {
  return BookModel.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
    if (err) {
      res.status(404).json("un problème");
    }
    res.json(book);
  });
};

export const deleteBook = (req, res) => {
  return BookModel.findByIdAndDelete(req.params.id)
    .then((book) => res.json(`Le livre ${book.title} a bien été supprimer`))
    .catch((err) => {
      if (Object.keys(err.reason).length === 0) {
        return res.status(404).json("Aucun livre ne correspond à votre recherche");
      } else {
        res.status(500).json(err);
        next();
      }
    });
};
