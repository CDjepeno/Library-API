import UserModel from '../models/userModel.js' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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