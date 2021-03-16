const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    city: {
        name: { type: String },
        code: { type: String }
    },
    address: { type: String, required: true },
    channels: [
        {
            name: { type: String },
            value: { type: String },
            preference: { type: String }
        }
    ],
    interest: { type: Number }
})

module.exports = mongoose.model('Contact', ContactSchema);