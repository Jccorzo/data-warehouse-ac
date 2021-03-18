const { City, Country } = require('../models/index');

exports.createCity = async (countryId, city) => {
    return City.create(city).then(docCity => {
        return Country.findByIdAndUpdate(countryId, {
            $push: { cities: { ...docCity } }
        },
            { new: true, useFindAndModify: false })
    })
}

exports.updateCity = async (city) => {
    await City.findByIdAndUpdate(city._id, city)
}

exports.deleteCity = async (cityId) => {
    await City.findByIdAndDelete(cityId)
}

exports.getCities = async () => await City.find()