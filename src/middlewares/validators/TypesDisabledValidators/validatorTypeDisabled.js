const validatorTypeDisabled = async (req, res, next) => {

    const name = req.body;

    console.log(name);

    return next();
}

module.exports = validatorTypeDisabled;