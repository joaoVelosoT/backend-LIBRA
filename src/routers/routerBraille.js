const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo temporário
const tempPath = path.join(__dirname, '..', 'temp.txt');

// Função que executa o comando do liblouis
const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) return reject(stderr);
            resolve(stdout.trim());
        });
    });
};

router.post('/braille', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Texto é obrigatório.' });

    fs.writeFileSync(tempPath, text);
    try {
        const command = `lou_translate -b /usr/share/liblouis/tables/pt-br-g1.ctb ${tempPath}`;
        const output = await executeCommand(command);
        res.json({ braille: output });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao converter para Braille.', details: error });
    }
});

router.post('/desbraille', async (req, res) => {
    const { braille } = req.body;
    if (!braille) return res.status(400).json({ error: 'Texto Braille é obrigatório.' });

    fs.writeFileSync(tempPath, braille);
    try {
        const command = `lou_backTranslate /usr/share/liblouis/tables/pt-br-g1.ctb ${tempPath}`;
        const output = await executeCommand(command);
        res.json({ texto: output });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao converter de Braille.', details: error });
    }
});

module.exports = router;
