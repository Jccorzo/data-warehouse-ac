const country = require('../models/country');
const countryServices = require('../services/country');

module.exports = (app) => {

    app.post('/country', async (req, res) => {
        const { regionId, country } = req.body;
        try {
            const newCountry = await countryServices.createCountry(regionId, country)
            res.json({ ...newCountry._doc })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error creando el país' })
        }
    })

    app.put('/country', async (req, res) => {
        const country = req.body;
        try {
            await countryServices.updateCountry(country)
            res.json({ message: "País actualizado correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error actualizando el país' })
        }
    })

    app.delete('/country', async (req, res) => {
        const countryId = req.query.countryId;
        try {
            await countryServices.deleteCountry(countryId)
            res.json({ message: "País eliminado correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error eliminando el país' })
        }
    })

}