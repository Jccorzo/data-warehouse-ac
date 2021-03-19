const { Region, Country, City } = require('../models/index');
exports.getAllRegions = async () => await Region.find().populate({ path: 'countries', populate: { path: 'cities' } })

exports.createRegion = async (region) => await Region.create(region)

exports.updateRegion = async (region) => await Region.findByIdAndUpdate(region._id, region)

exports.deleteRegion = async (regionId) => {
    const region = await Region.findById(regionId)
    console.log(region)
    await Promise.all(region.countries.map(async (country) => {
        const countryToRemove = await Country.findById(country)
        await City.deleteMany({ _id: { $in: countryToRemove.cities } })
        await countryToRemove.remove()
    }))
    await region.remove()
}


