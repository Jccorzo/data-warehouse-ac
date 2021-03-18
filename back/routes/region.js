const regionServices = require('../services/region');

module.exports = (app) => {

    app.post('/region', async (req, res) => {
        const region = req.body;
        try {
            const newRegion = await regionServices.createRegion(region);
            res.json({ ...newRegion._doc })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error creando la región" })
        }
    })

    app.put('/region', async (req, res) => {
        const region = req.body;
        try {
            await regionServices.updateRegion(region);
            res.json({ message: "Región actualizada correctamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error creando la región" })
        }
    })

    app.delete('/region', async (req, res) => {
        const regionId = req.query.regionId;
        try {
            await regionServices.deleteRegion(regionId)
            res.json({ message: "Region eliminada exitosamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error creando la región" })
        }
    })

    app.get('/region', async (_, res) => {
        try {
            const regions = await regionServices.getAllRegions();
            res.json({ regions })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error creando la región" })
        }
    })
}