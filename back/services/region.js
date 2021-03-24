const { Region, Country, City, Contact } = require('../models/index');
exports.getAllRegions = async () => await Region.find().populate({ path: 'countries', populate: { path: 'cities' } })

exports.createRegion = async (region) => await Region.create(region)

exports.updateRegion = async (region) => Region.findByIdAndUpdate(region._id, region).then(async updatedRegion => {
    await Contact.updateMany({ 'region.name': updatedRegion.name }, { 'region.name': region.name })
})

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


