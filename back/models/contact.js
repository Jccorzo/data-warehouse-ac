const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true },
    company: { name: { type: String, required: true }, _id: { type: String, required: true } },
    region: { name: { type: String, required: true }, _id: { type: String, required: true } },
    country: { name: { type: String, required: true }, _id: { type: String, required: true } },
    city: { name: { type: String, required: true }, _id: { type: String, required: true } },
    address: { type: String, required: true },
    channels: [
        {
            name: { type: String },
            account: { type: String },
            preference: { type: String }
        }
    ],
    interest: { type: Number }
})

ContactSchema.index({
    name: 'text',
    lastname: 'text',
    position: 'text',
    email: 'text',
    address: 'text',
    region: 'text',
    'company.name': 'text',
    'region.name': 'text',
    'country.name': 'text',
    'city.name': 'text'
})

module.exports = mongoose.model('Contact', ContactSchema)