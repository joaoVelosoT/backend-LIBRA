const Disabled = require("../../models/Disabled");

const DisabledGetByTypeService = async (id) => {
    try {

        const disabled = await Disabled.findAll({
            where: {
                idDisabledTypes: id,
            },
        });

        console.log(disabled);

        if (!disabled) {
            return {
                code: 404,
                data: null,
                message: "Deficiências não encontrada",
                success: false,
            };
        }
        return {
            code: 200,
            data: disabled,
            message: "Deficiência encontrada com sucesso",
            success: true,
        };

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

module.exports = DisabledGetByTypeService;