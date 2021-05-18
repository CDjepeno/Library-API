import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    email : {
        type: String, 
        validate: validator.isEmail,
        lowercase: true,
        trim: true, 
        required: {
            message: "Le champ email est requis"
        },
        unique: true
    }, 
    pseudo: {
        type: String, 
        required: false,
        minLength: 3,
        maxLength: 55
    },
    password: {
        type: String, 
        required: {
            message: "Le champ mot de passe est requis"
        },
        max: 1024
    },
    role: {
        type: [String],
        default: "user"
    }
})

// Before - Register
UserSchema.pre('save', async function(next) {
    const user = this

    const hash = await bcrypt.hash(user.password, 10)

    user.password = hash

    next()
})

export const PasswordVerify = (user, password, res) => {
    bcrypt
        .compare(password, user[0].password)
        .then(isPasswordValid => {
            if(!isPasswordValid) {
                const message = "Votre mot de passe n'est pas valide"
                res.status(404).json({ message })
            }
            const token = jwt.sign({userId: user[0]._id}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
            const message = "Connecter"
            res.json({message, token, user})
        }) 
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel