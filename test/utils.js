export const user = {
  email: "test1@gmail.com",
  password: "node",
};

export const fakeUser = {
  email: "ale@gmail.com",
  passwor: "jfsdf",
};

export const user2 = {
  email: "test2@gmail.com",
  password: "node",
};

export const userMissingPassword = {
  email: "djepenogmail.com",
};

export const userMissingEmail = {
  password: "dulonx",
};

export const userErrorPassword = {
  email: "test1@gmail.com",
  password: "nodeer",
};

export const book = {
  title: "node.js",
  genre: "backend",
  author: "c.marvin",
  picture: "javascript.js",
};

export const book2 = {
  title: "python",
  genre: "backend",
  author: "c.marvin",
  picture: "javascript.js",
};

export const books = [
    {
      title: "node.js",
      genre: "backend",
      author: "c.marvin",
      picture: "node.png"
    }, 
    {
      title: "python",
      genre: "backend",
      author: "c.Bob",
      picture: "python.png"
    },
    {
      title: "rust",
      genre: "backend",
      author: "c.kalvin",
      picture: "rust.png"
    },
    {
      title: "symfony",
      genre: "backend",
      author: "c.potentier",
      picture: "symfony.png"
    }
  ];

export const bookMissingField = {
  title: "pytho",
  genre: "programmation",
  author: "c.marvin",
};

export const bookUpdate = {
  title: "node.js",
  genre: "backend",
  author: "c.marvin",
  picture: "javascript.js",
};

export const bookModel = {
  __v: expect.any(Number),
  _id: expect.any(String),
  title: expect.any(String),
  genre: expect.any(String),
  author: expect.any(String),
  picture: expect.any(String),
};

export const fakeId = "6090dc136ef8d46545fdsf6sd5";


