const userMethods = require('../services/user');

module.exports = (app) => {

    app.post('/user', async (req, res) => {
        const user = req.body;
        try {
            const response = await userMethods.create(user)
            res.json({ message: response })
        } catch (e) {
            res.status(400).json(e.message)
        }
    })

    app.post('/user/login', async (req, res) => {
        const user = req.body;
        try {
            const token = await userMethods.getUserByEmail(user);
            res.json({ token })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    app.put('/user', async (req, res) => {

    })

    app.delete('/user', async (req, res) => {

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