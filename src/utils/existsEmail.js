const Admin = require("../models/Admin");
const User = require("../models/User");

const existsEmails = async (emails) => {
    try {

        const existsEmailADM = await Admin.findOne({
            where: { email: emails },
        });

        if (existsEmailADM) {
            return {
                code: 409,
                error: {
                    details: [
                        {
                            field: "email",
                            message: "O email enviado já existe",
                        },
                    ],
                },
                message: "Erro ao criar admin",
                success: false,
            };
        }

        const existsEmailUSER = await User.findOne({
            where: { email: emails },
        });

        if (existsEmailUSER) {
            return {
                code: 409,
                error: {
                    details: [
                        {
                            field: "email",
                            message: "O email enviado já existe",
                        },
                    ],
                },
                message: "Erro ao criar admin",
                success: false,
            };
        }

        return false;

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

module.exports = existsEmails;