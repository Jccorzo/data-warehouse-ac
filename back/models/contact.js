const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
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