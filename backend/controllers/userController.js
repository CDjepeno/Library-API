import UserModel, { PasswordVerify } from '../models/userModel.js' 


export const register = (req, res) => {
    UserModel
        .create({
            email: req.body.email, 
            password: req.body.password
        })
        .then(_ => {
            const message = "L'utilisateur à bien été crée"
            res.json({message})
        })
        .catch(err => {
            res.status(401).send(err.errors)
        })
}

export const login = (req, res) => {
    const {email, password} = req.body

    UserModel
        .find({ email })
        .then(user => {
            if(!user) {
                const message = "Utilisateur inconnu"
                res.status(404).json({ message })
            }
            PasswordVerify(user, password, res)
        })
}

