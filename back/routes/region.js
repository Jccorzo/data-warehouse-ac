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

    app.post('/region/country', async (req, res) => {
        const region = req.body;
        try {
            const updateRegion = await regionServices.createCountry(region);
            res.json({ updateRegion })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ocurrió un error creando la región" })
        }
    })

    app.put('/region/country', async (req, res) => {
        const region = req.body;
        try {
            await regionServices.updateCountry(region);
            res.json({ message: "País actualizado exitosamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error creando el país" })
        }
    })

    app.delete('/region/country', async (req, res) => {
        const { regionId, countryId } = req.query;
        try {
            await regionServices.deleteCountry(regionId, countryId);
            res.json({ message: "País eliminado exitosamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error eliminando el país" })
        }
    })

    app.post('/region/country/city', async (req, res) => {
        const region = req.body;
        try {
            await regionServices.createCity(region);
            res.json({ message: "Ciudad creada exitosamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error creando la ciudad" })
        }
    })

    app.put('/region/country/city', async (req, res) => {
        const region = req.body;
        try {
            await regionServices.updateCity(region);
            res.json({ message: "Ciudad actualizada exitosamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error actualizando la ciudad" })
        }
    })

    app.delete('/region/country/city', async (req, res) => {
        const region = req.query;
        try {
            await regionServices.deleteCity(region);
            res.json({ message: "ciudad eliminada exitosamente" })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error eliminando la ciudad" })
        }
    })

}