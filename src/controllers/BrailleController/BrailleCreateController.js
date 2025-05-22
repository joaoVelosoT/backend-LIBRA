const fs = require('fs');
const path = require('path');

// Caminhos das tabelas Braille (com unicode.dis para saída correta)
const BRAILLE_TABLES = '/usr/share/liblouis/tables/unicode.dis,/usr/share/liblouis/tables/pt-pt-g1.utb';
const WORK_DIR = path.join(__dirname, '../../lib_Braille');


const BrailleCreateController = async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Texto é obrigatório.' });

    try {
        // 1. Criar diretório se não existir
        if (!fs.existsSync(WORK_DIR)) {
            fs.mkdirSync(WORK_DIR, { recursive: true });
        }

        // 2. Preparar arquivos temporários
        const inputFile = path.join(WORK_DIR, 'input.txt');
        const outputFile = path.join(WORK_DIR, 'output.brf');

        // 3. Escrever texto de entrada
        fs.writeFileSync(inputFile, text, 'utf-8');

        // 4. Executar conversão com as duas tabelas
        await execPromise(`cat ${inputFile} | lou_translate ${BRAILLE_TABLES} > ${outputFile}`);

        // 5. Ler resultado
        const result = fs.readFileSync(outputFile, 'utf-8').trim();

        // 6. Verificar se contém caracteres Braille Unicode (U+2800 a U+28FF)
        const isRealBraille = /[\u2800-\u28FF]/.test(result);

        res.json({
            success: true,
            braille: result,
            isRealBraille,
            outputPath: outputFile
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Falha na conversão',
            details: error.message,
        });
    }
}

module.exports = BrailleCreateController;