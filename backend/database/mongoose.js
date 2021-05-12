import mongoose from "mongoose";

/**
 * Connect MongoDB
 */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected to database"));

export default mongoose;
