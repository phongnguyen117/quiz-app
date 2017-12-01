const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, req.app.get('superSecret'), function (err, decoded) {
            if (err) { //failed verification.
                return res.status(403).json({ message: 'Failed to authenticate token.' })
            }
            req.decoded = decoded
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).json({
            message: 'No token provided.'
        })
    }
}