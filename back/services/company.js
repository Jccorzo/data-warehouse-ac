const { Company } = require('../models/index');

exports.getAll = async () => await Company.find().populate('city')

exports.createCompany = async (company) => {
    const newCompany = await new Company(company).save()
    return await newCompany.populate('city').execPopulate();
}

exports.updateCompany = async (company) => {
    await Company.findByIdAndUpdate(company._id, company)
}

exports.deleteCompany = async (companyId) => {
    await Company.findByIdAndDelete(companyId)
}