const { Country, Region, City, Contact } = require('../models/index');

exports.createCountry = async (regionId, country) => {
    const newCountry = await Country.create(country)
    await Region.findByIdAndUpdate(regionId, {
        $push: { countries: { ...newCountry } }
    },
        { new: true, useFindAndModify: false })
    return newCountry
}

exports.updateCountry = async (country) => {
    Country.findByIdAndUpdate(country._id, country).then(async updatedCountry => {
        await Contact.updateMany({ 'country.name': updatedCountry.name }, { 'country.name': country.name })
    })
}

exports.deleteCountry = async (countryId) => {
    const country = await Country.findById(countryId)
    await City.deleteMany({_id: {$in: country.cities}})
    await country.remove()
}