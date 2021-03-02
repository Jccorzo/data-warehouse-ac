const userMethods = require('../services/user');
const { validateAdmin } = require('../middlewares/validation');

module.exports = (app) => {

    app.post('/user', validateAdmin, async (req, res) => {
        const user = req.body;
        try {
            await userMethods.create(user)
            res.status(201).json({ message: 'Usuario creado correctamente' })
        } catch (e) {
            res.status(400).json(e.message)
        }
    })

    app.post('/user/login', async (req, res) => {
        const user = req.body;
        try {
            const getUser = await userMethods.getUserByEmail(user);
            res.json({ ...getUser })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    app.put('/user', validateAdmin, async (req, res) => {
        const user = req.body;
        try {
            await userMethods.update(user)
            res.json({ message: 'Usuario actualizado correctamente' })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    app.delete('/user', validateAdmin, async (req, res) => {
        const userId = req.query.userId;
        try {
            await userMethods.remove(userId)
            res.json({ message: 'Usuario eliminado correctamente' })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    app.get('/user', async (_, res) => {
        try {
            const users = await userMethods.listAll()
            const usersWithoutPass = users.map(user => {
                delete (user._doc.password)
                return user
            })
            res.json({ users: usersWithoutPass })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })
}