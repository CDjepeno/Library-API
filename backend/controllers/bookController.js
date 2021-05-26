import BookModel from "../models/bookModel.js";

export const getBooks = (_, res) => {
  BookModel.find({})
    .then((books) => res.status(200).json(books))
    .catch((err) => {
      const message =
        "Un problème est survenue lors de la requete veuillez réessayez";
      res.status(500).json({ message, data: err });
    });
};

export const getOneBook = (req, res, next) => {
  BookModel.findById(req.params.id)
    .then(book => res.status(200).json(book))
    .catch(err => {
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
        return res.status(404).json("Vous avez oubliez de remplir un champ ou un champ n'est pas remplis correctement");
      } else {
        const message = "Un problème est survenue lors de la création du livre";
        res.status(500).json({ message, data: err });
        next();
      }
    });
};

export const updateBook = async(req, res) => {  

  // BookModel.findOneAndUpdate({_id : req.params.id}, req.body,{runValidators: true, new: true, context: 'query'}, (err) => {
  //   if(err) {
  //     res.json(err);
  //   }
  //   res.json('data update');
  // })

  const options = { upsert: true, setDefaultsOnInsert: true, strict: false, new: true, runValidators: true, context: 'query' };
  
  const Book  = await BookModel.findOneAndUpdate({_id : req.params.id}, req.body, options, (err, book) => {
    if(err) {
      res.json(err);
    }
    res.json(book)
  } )
  // console.log(Book);
  // const newBook = new BookModel(Book);
  // console.log(newBook);
  // newBook.save()
  //   .then(book => res.status(201).json(book))
  //   .catch(err => res.json(err))
};

export const deleteBook = (req, res) => {
  BookModel.findByIdAndDelete(req.params.id)
    .then((_) => res.json("Le livre a bien été supprimer"))
    .catch((err) => {
      if (Object.keys(err.reason).length === 0) {
        res.status(404).json("Aucun livre ne correspond à votre recherche");
      } else {
        next();
      }
      res.status(500).json(err);
    });
};
