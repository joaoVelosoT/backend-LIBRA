const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execPromise = util.promisify(exec);

// Configurações
const BRAILLE_TABLE = '/usr/share/liblouis/tables/pt-pt-g1.utb'; // Tabela em português
const WORK_DIR = path.join(__dirname, '../../lib_Braille');

router.post('/braille', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Texto é obrigatório.' });

    try {
        // 1. Criar diretório se não existir
        if (!fs.existsSync(WORK_DIR)) {
            fs.mkdirSync(WORK_DIR, { recursive: true });
        }

        // 2. Preparar arquivos
        const inputFile = path.join(WORK_DIR, 'input.txt');
        const outputFile = path.join(WORK_DIR, 'output.brf');

        // 3. Escrever texto de entrada
        fs.writeFileSync(inputFile, text, 'utf-8');

        // 4. Executar conversão corretamente
        await execPromise(`cat ${inputFile} | lou_translate ${BRAILLE_TABLE} > ${outputFile}`);

        // 5. Ler resultado
        const result = fs.readFileSync(outputFile, 'utf-8').trim();

        // 6. Verificar se contém caracteres Braille (Unicode U+2800 a U+28FF)
        const isRealBraille = /[\u2800-\u28FF]/.test(result);

        res.json({
            success: true,
            braille: isRealRealBraille ? result : "Caracteres Braille não detectados",
            outputPath: outputFile,
            isRealBraille
        });

    } catch (error) {
        res.status(500).json({
            error: 'Falha na conversão',
            details: error.message,
            suggestion: 'Verifique se a tabela Braille está instalada corretamente'
        });
    }
});

router.post('/desbraille', async (req, res) => {
    const { braille } = req.body;
    if (!braille) return res.status(400).json({ error: 'Texto Braille é obrigatório.' });

    try {
        // 1. Escreve o Braille no arquivo temporário
        fs.writeFileSync(inputPath, braille);

        // 2. Executa a conversão inversa
        await execPromise(`lou_backtranslate ${BRAILLE_TABLE} < ${inputPath} > ${outputPath}`);

        // 3. Lê o resultado
        const result = fs.readFileSync(outputPath, 'utf-8').trim();

        res.json({
            success: true,
            texto: result,
            outputFile: outputPath
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erro na conversão reversa',
            details: error.message
        });
    }
});

module.exports = router;