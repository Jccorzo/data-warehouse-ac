const { City, Country, Contact } = require('../models/index');

exports.createCity = async (countryId, city) => {
    const newCity = await City.create(city)
    await Country.findByIdAndUpdate(countryId, {
        $push: { cities: { ...newCity } }
    },
        { new: true, useFindAndModify: false })
    return newCity
}

exports.updateCity = (city) => {
    City.findByIdAndUpdate(city._id, city, { useFindAndModify: false }).then(async updatedCity => {
        await Contact.updateMany({ 'city.name': updatedCity.name }, { 'city.name': city.name })
    })
}

exports.deleteCity = async (cityId) => {
    await City.findByIdAndDelete(cityId)
}

exports.getCities = async () => await City.find()