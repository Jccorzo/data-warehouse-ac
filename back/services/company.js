const { Company } = require('../models/index');

exports.getAll = async () => await Company.find()

exports.createCompany = async (company) => await Company.create(company);

exports.updateCompany = async (company) => {
    await Company.findByIdAndUpdate(company._id, company)
}

exports.deleteCompany = async (companyId) => {
    await Company.findByIdAndDelete(companyId)
}