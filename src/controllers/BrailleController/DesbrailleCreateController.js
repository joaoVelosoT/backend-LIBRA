const fs = require('fs');
const path = require('path');

// Caminhos das tabelas Braille (com unicode.dis para saída correta)
const BRAILLE_TABLES = '/usr/share/liblouis/tables/unicode.dis,/usr/share/liblouis/tables/pt-pt-g1.utb';
const WORK_DIR = path.join(__dirname, '../../lib_Braille');

const DesbrailleCreateController = async (req, res) => {
    const { braille } = req.body;
    if (!braille) return res.status(400).json({ error: 'Texto Braille é obrigatório.' });

    try {
        // 1. Criar diretório se não existir
        if (!fs.existsSync(WORK_DIR)) {
            fs.mkdirSync(WORK_DIR, { recursive: true });
        }

        // 2. Preparar arquivos temporários
        const inputPath = path.join(WORK_DIR, 'braille_input.brt');
        const outputPath = path.join(WORK_DIR, 'braille_output.txt');

        // 3. Escrever braille no arquivo de entrada
        fs.writeFileSync(inputPath, braille, 'utf-8');

        // 4. Executar conversão reversa
        await execPromise(`lou_translate -b ${BRAILLE_TABLES} < ${inputPath} > ${outputPath}`);

        // 5. Ler resultado
        const result = fs.readFileSync(outputPath, 'utf-8').trim();

        res.json({
            success: true,
            texto: result,
            outputPath
        });

    } catch (error) {
        res.status(500).json({
            error: 'Erro na conversão reversa',
            details: error.message,
            suggestion: 'Verifique se o conteúdo em Braille está no formato Unicode correto.'
        });
    }
}

module.exports = DesbrailleCreateController;