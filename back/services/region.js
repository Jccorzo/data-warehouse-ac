const Region = require('../models/region');
exports.getAllRegions = () => Region.find()

exports.createRegion = async (region) => await Region.create(region)

exports.updateRegion = async (region) => await Region.findByIdAndUpdate(region._id, region)

exports.deleteRegion = async (regionId) => {
    await Region.findByIdAndDelete(regionId)
}

exports.createCountry = async (region) => {
    const savedRegion = await Region.findById(region._id)
    savedRegion.countries.push(region.country)
    const res = await savedRegion.save()
    return res
}

exports.updateCountry = async (object) => {
    await Region.updateOne(
        { _id: object._id },
        {
            $set: {
                "countries.$[country].name": object.country.name
            }
        }, {
        arrayFilters: [
            { "country._id": object.country._id }
        ]
    })
}

exports.deleteCountry = async (regionId, countryId) => {
    await Region.updateOne(
        { _id: regionId },
        {
            $pull: {
                countries: { _id: countryId }
            }
        })
}

exports.createCity = async (region) => {
    const savedRegion = await Region.findById(region._id)
    const index = savedRegion.countries.findIndex(country => country._id == region.country._id)
    savedRegion.countries[index].cities.push(region.country.city)
    const res = await savedRegion.save()
    return res
}

exports.updateCity = async (region) => {
    await Region.updateOne(
        { _id: region._id },
        { $set: { "countries.$[country].cities.$[city].name": region.country.city.name } },
        {
            arrayFilters: [
                { "country._id": region.country._id },
                { "city._id": region.country.city._id }
            ]
        }
    )
}

exports.deleteCity = async (region) => {
    await Region.updateOne(
        { _id: region.regionId },
        { $pull: { "countries.$[country].cities": { _id: region.cityId } } },
        {
            arrayFilters: [
                { "country._id": region.countryId }
            ]
        }
    )
}

