const Region = require('../models/region');
exports.getAll = () => Region.find()

exports.addRegion = async (region) => {
    const newRegion = new Region(region)
    await newRegion.save()
}

exports.deleteRegion = async (region) => {
    await Region.deleteOne(region)
}

exports.updateRegion = async (region) => {
    await Region.findByIdAndUpdate(region)
}

exports.deleteCountry = async (object) => {
    await Region.updateOne({ _id: object._id }, { $unset: { "countries": { "name": object.country } } })
}

exports.deleteCity = async (object) => {
    await Region.updateOne({ _id: object._id }, { $unset: { "cities": { "name": object.city } } })
}