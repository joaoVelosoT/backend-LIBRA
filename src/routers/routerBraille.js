const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execPromise = util.promisify(exec);

// Caminhos das tabelas Braille (com unicode.dis para saída correta)
const BRAILLE_TABLES = '/usr/share/liblouis/tables/unicode.dis,/usr/share/liblouis/tables/pt-pt-g1.utb';
const WORK_DIR = path.join(__dirname, '../../lib_Braille');

router.post('/braille', async (req, res) => {
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
        res.status(500).json({
            error: 'Falha na conversão',
            details: error.message,
            suggestion: 'Verifique se as tabelas unicode.dis e pt-pt-g1.utb estão disponíveis no container.'
        });
    }
});

router.post('/translate/braille', async (req, res) => {

    console.log(req.files);
    
    const file = req.files;
    if (!file) return res.status(400).json({ error: 'Arquivo é obrigatório!' });

    try {

        const outputFile = path.join(WORK_DIR, `${file.name}_tranlate.brt`);

        // 4. Executar conversão com as duas tabelas
        await execPromise(`lou_translate -b unicode.dis,pt-pt-g1.utb < ${file} > ${outputFile}`);

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
        res.status(500).json({
            error: 'Falha na conversão',
            details: error.message,
            suggestion: 'Verifique se as tabelas unicode.dis e pt-pt-g1.utb estão disponíveis no container.'
        });
    }
});

router.post('/desbraille', async (req, res) => {
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
});

module.exports = router;
