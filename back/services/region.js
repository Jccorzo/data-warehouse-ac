const { Region } = require('../models/index');
exports.getAllRegions = () => Region.find()

exports.createRegion = async (region) => await Region.create(region)

exports.updateRegion = async (region) => await Region.findByIdAndUpdate(region._id, region)

exports.deleteRegion = async (regionId) => {
    await Region.findByIdAndDelete(regionId)
}


