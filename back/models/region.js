const moongose = require("mongoose");

const RegionSchema = moongose.Schema({
    name: { type: String, required: true, index: { unique: true } },
    countries: [
        {
            name: { type: String, index: { unique: true } },
            cities: [
                {
                    code: { type: String, index: { unique: true } },
                    name: { type: String }
                }
            ]
        }
    ]
})

module.exports = moongose.model("Region", RegionSchema)