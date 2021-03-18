const { Country, Region } = require('../models/index');

exports.createCountry = async (regionId, country) => {
    return Country.create(country).then(docCountry => {
        return Region.findByIdAndUpdate(regionId, {
            $push: { countries: { ...docCountry } }
        },
            { new: true, useFindAndModify: false })
    })
}

exports.updateCountry = async (country) => {
    await Country.findByIdAndUpdate(country._id, country)
}

exports.deleteCountry = async (countryId) => {
    await Country.findByIdAndDelete(countryId)
}