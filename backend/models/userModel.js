import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    email : {
        type: String, 
        validate: validator.isEmail,
        lowercase: true,
        trim: true, 
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
    }
})

// Before - Register
UserSchema.pre('save', async function(next) {
    const user = this

    const hash = await bcrypt.hash(user.password, 10)

    user.password = hash

    next()
})

const User = mongoose.model('User', UserSchema)

export default User