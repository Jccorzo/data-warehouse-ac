const cityServices = require('../services/city');

module.exports = (app) => {

    app.post('/city', async (req, res) => {
        const { countryId, city } = req.body;
        try {
            const newCity = await cityServices.createCity(countryId, city)
            res.json({ ...newCity._doc })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error creando la ciudad' })
        }
    })

    app.put('/city', async (req, res) => {
        const city = req.body;
        try {
            await cityServices.updateCity(city)
            res.json({ message: "Ciudad actualizadoa correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error actualizando la ciudad' })
        }
    })

    app.delete('/city', async (req, res) => {
        const cityId = req.query.cityId;
        try {
            await cityServices.deleteCity(cityId)
            res.json({ message: "Ciudad eliminada correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error eliminando la ciudad' })
        }
    })

    app.get('/city', async (_, res) => {
        try {
            const cities = await cityServices.getCities()
            res.json({ cities })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error obteniendo las ciudades' })
        }
    })
}