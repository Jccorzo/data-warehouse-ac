const companyServices = require('../services/company');

module.exports = (app) => {

    app.post('/company', async (req, res) => {
        const company = req.body;
        try {
            const newCompany = await companyServices.createCompany(company);
            res.status(201).json({ newCompany, message: "Compañia creada correctamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error creando la compañía" })
        }
    })

    app.put('/company', async (req, res) => {
        const company = req.body
        try {
            await companyServices.updateCompany(company)
            res.json({ message: "Compañía actualizada correctamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error actualizando la compañía" })
        }
    })

    app.delete('/company', async (req, res) => {
        const companyId = req.query.companyId
        try {
            await companyServices.deleteCompany(companyId)
            res.json({ message: "Compañía eliminada correctamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error eliminando la compañía" })
        }
    })

    app.get('/company', async (_, res) => {
        try {
            const companies = await companyServices.getAll()
            res.json({ companies })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error obteniendo las compañías" })
        }
    })
}