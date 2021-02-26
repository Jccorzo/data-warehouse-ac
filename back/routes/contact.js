const contactServices = require('../services/contact');

module.exports = (app) => {

    app.post('/contact', async (req, res) => {
        const contact = req.body;
        try {
            const newContact = await contactServices.createContact(contact)
            res.json({ newContact, message: "Contacto creado correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error creando el contacto' })
        }
    })

    app.put('/contact', async (req, res) => {
        const contact = req.body;
        try {
            await contactServices.updateContact(contact)
            res.json({ message: "Contacto actualizado correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error actualizando el contacto' })
        }
    })

    app.delete('/contact', async (req, res) => {
        const contactId = req.query.contactId;
        try {
            await contactServices.deleteContact(contactId)
            res.json({ message: "Contacto eliminado correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error eliminando el contacto' })
        }
    })

    app.get('/contact', async (req, res) => {
        try {
            const contacts = await contactServices.getContacts()
            res.json({ contacts })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error obteniendo los contactos' })
        }
    })
}