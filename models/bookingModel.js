import mongoose from 'mongoose'
import BookSchema from './bookmodel'

const BookingSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date, 
        require: true
    },
    books : [BookSchema]
})

const BookingModel = mongoose.model('Booking', BookSchema)

export default BookingModel