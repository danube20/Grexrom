const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login-form', {
        errorMessage: 'Identifícate para acceder'
    })
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/login-form', {
        errorMessage: `Desautorizado, solo rol ${admittedRoles}`
    })
}

module.exports = { isLoggedIn, checkRole }