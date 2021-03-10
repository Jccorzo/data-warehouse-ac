const moongose = require("mongoose");

const RegionSchema = moongose.Schema({
    name: { type: String, required: true, index: { unique: true } },
    countries: [
        {
            name: { type: String },
            cities: [
                {
                    code: { type: String },
                    name: { type: String }
                }
            ]
        }
    ]
})

module.exports = moongose.model("Region", RegionSchema)