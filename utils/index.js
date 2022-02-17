const mongoose = require('mongoose')

const isAdmin = user => user.role === 'ADMIN'
const isOwned = (id, current_id) => id === current_id
const isUser = user => user.role === 'USER'
const isLogged = (req, res) => req.session.currentUser



module.exports = { isAdmin, isOwned, isUser, isLogged }