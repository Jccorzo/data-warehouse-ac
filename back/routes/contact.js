const contactServices = require('../services/contact');

module.exports = (app) => {

    app.post('/contact', async (req, res) => {
        const contact = req.body;
        try {
            const newContact = await contactServices.createContact(contact)
            res.json({ ...newContact._doc })
        } catch (e) {
            console.log(e)
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
        const contactIds = req.query.contactIds;
        try {
            await contactServices.deleteSelectedContacts(contactIds)
            res.json({ message: "Contactos eliminados correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error eliminandos los contactos' })
        }
    })

    app.delete('/contact/:contactId', async (req, res) => {
        const contactId = req.params.contactId;
        try {
            await contactServices.deleteContact(contactId)
            res.json({ message: "Contactos eliminados correctamente" })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error eliminandos los contactos' })
        }
    })

    app.get('/contact', async (req, res) => {
        const word = req.query;
        try {
            const contacts = await contactServices.getContacts(word)
            res.json({ contacts })
        } catch (e) {
            res.status(400).json({ message: 'Ocurrió un error obteniendo los contactos' })
        }
    })
}