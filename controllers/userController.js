import UserModel, { PasswordVerify } from "../models/userModel.js";

export const register = (req, res, next) => {
  return UserModel.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(404)
          .json(
            "Vous avez oubliez de remplir un champ ou un champ n'est pas remplis correctement"
          );
      } else if (err.name === "MongoNetworkError" || err.code === 11000) {
        return res.status(404).json("Un utilisateur possède déja cette email");
      } else {
        const message = "Un problème est survenue lors de la création du livre";
        res.status(500).json({ message, data: err });
        next();
      }
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        const message = "Utilisateur inconnu";
        return res.status(404).json({ message });
      } else {
        PasswordVerify(user, password, res);
      }
    })
    .catch((err) => res.status(500).send(err));
};
