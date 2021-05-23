import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message =
      "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requete";
    res.status(401).json({ message });
  }
  console.log(authorizationHeader);
  const token = authorizationHeader.split(" ")[1];
  const decodedToken = jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, decodedToken) => {
      if (err) {
        const message =
          "L'utilisateur n'est pas autorisé à accéder à cette ressource";
        return res.status(401).json({ message });
      }

      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId != userId) {
        const message = "L'identifiant de l'utilisateur est invalide";
        return res.status(401).json({ message });
      } else {
        next();
      }
    }
  );
};
