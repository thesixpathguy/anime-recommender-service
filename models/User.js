const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required.'],
        unique: true,
    },
    NSFWPreference: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('User', UserSchema)