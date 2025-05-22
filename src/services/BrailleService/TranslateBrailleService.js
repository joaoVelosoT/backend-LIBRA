const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const sequelize = require("../../database/config");
const Braille = require("../../models/Braille"); // Crie se não existir
const uploadCreateService = require("../uploadServices/uploadCreateService");

const execPromise = util.promisify(exec);
const WORK_DIR = path.join(__dirname, "../../lib_Braille");

const TranslateBrailleService = {
    translate: async (file, nomeLivro) => {
        const transaction = await sequelize.transaction();

        try {

            console.log(file);
            if (!file || !file.originalname) {
                throw new Error("Arquivo inválido ou mal formatado para tradução.");
            }

            const { originalname, buffer, mimetype } = file;

            if (!fs.existsSync(WORK_DIR)) {
                fs.mkdirSync(WORK_DIR, { recursive: true });
            }

            const inputPath = path.join(WORK_DIR, originalname);
            const outputName = file.originalname.replace(/\.[^/.]+$/, "") + "_translate.brt";
            const outputPath = path.join(WORK_DIR, outputName);

            fs.writeFileSync(inputPath, buffer);

            await execPromise(`lou_translate unicode.dis,pt-pt-g1.utb < "${inputPath}" > "${outputPath}"`, {
                maxBuffer: 1024 * 1024 * 1024,
            });

            const bufferOut = fs.readFileSync(outputPath);

            const uploadResult = await uploadCreateService.create(
                outputName,
                bufferOut,
                "application/octet-stream",
                "braille",
                nomeLivro
            );

            if (!uploadResult.success) {
                await transaction.rollback();
                return uploadResult;
            }

            const brailleData = {
                id_arquivo: uploadResult.arquivoId,
            };

            const braille = await Braille.create(brailleData, { transaction });

            console.log(braille)

            await transaction.commit();

            return {
                code: 201,
                braille,
                message: "Arquivo Braille criado com sucesso",
                success: true,
            };

        } catch (error) {
            await transaction.rollback();
            console.error(error);
            return {
                code: 500,
                error: "Erro ao converter o arquivo para Braille",
                success: false,
            };
        }
    }
};

module.exports = TranslateBrailleService;
