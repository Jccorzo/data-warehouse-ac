const mongoose = require("mongoose");

const RegionSchema = mongoose.Schema({
    name: { type: String, required: true },
    countries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }]
})

module.exports = mongoose.model("Region", RegionSchema)