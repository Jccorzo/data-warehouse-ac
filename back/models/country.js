const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: { type: String, required: true },
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }]
})

module.exports = mongoose.model('Country', CountrySchema)