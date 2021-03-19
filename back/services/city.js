const { City, Country } = require('../models/index');

exports.createCity = async (countryId, city) => {
    const newCity = await City.create(city)
    await Country.findByIdAndUpdate(countryId, {
        $push: { cities: { ...newCity } }
    },
        { new: true, useFindAndModify: false })
    return newCity
}

exports.updateCity = async (city) => {
    await City.findByIdAndUpdate(city._id, city, { useFindAndModify: false })
}

exports.deleteCity = async (cityId) => {
    await City.findByIdAndDelete(cityId)
}

exports.getCities = async () => await City.find()