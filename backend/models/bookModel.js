import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    lowercase: true,
    unique: "Un livre possède déja ce titre",
  },
  genre: {
    type: String,
    require: true,
    lowercase: true,
  },
  author: {
    type: String,
    require: true,
    lowercase: true,
  },
  picture: {
    type: String,
    require: true,
  },
});

const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
