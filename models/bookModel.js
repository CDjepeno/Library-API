import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: {
      message: "Le champ titre est requis"
    },
    lowercase: true,
    unique: "Un livre possède déja ce titre",
  },
  genre: {
    type: String,
    required: {
      message: "Le genre est requis"
    },
    lowercase: true,
  },
  author: {
    type: String,
    required: {
      message: "L'auteur est requis"
    },
    lowercase: true,
  },
  picture: {
    type: String,
    required: {
      message: "La photo du livre est requis"
    },
  },
});

const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
