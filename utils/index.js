const mongoose = require('mongoose')

const isAdmin = user => user.role === 'ADMIN'



module.exports = { isAdmin }