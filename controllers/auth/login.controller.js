const User = require('../../models/user.model');
const jwt = require('../../config/jwt.config');
const jwtToken = require('jsonwebtoken');

exports.login = (req, res) => {
    User.findOne({ 'PhoneNumber': req.body.PhoneNumber }).then(_user => {
        if (_user) {
            if (req.body.PhoneNumber === _user.PhoneNumber && req.body.Password === _user.Password) {
                const token = jwtToken.sign({ sub: _user._id }, jwt.jwt_Secret, { expiresIn: '3600s' });
                const data = { FullName: _user.FullName, Id: _user._id }
                return res.status(200).json({ status: true, data, token });
            }
        }
        return res.status(404).send();
    })
}