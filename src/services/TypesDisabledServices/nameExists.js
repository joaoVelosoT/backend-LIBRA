const { getOneByName } = require("./TypesDisabledGetOneServices");

const nameExists = {

    validNameExists: async (name) => {
        try {
            const nameExists = await getOneByName(name);

            if (nameExists.code !== 200) {
                return false;
            }

            return true;

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}

module.exports = nameExists