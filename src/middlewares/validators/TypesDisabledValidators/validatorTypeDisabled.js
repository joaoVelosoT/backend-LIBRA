const { JSON } = require("sequelize");

const validatorTypeDisabled = async (req, res, next) => {

    const { name } = req.body

    return next();
}

module.exports = validatorTypeDisabled;