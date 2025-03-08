const { Storage } = require('@google-cloud/storage');
require('dotenv').config(); // Se estiver usando dotenv

// Inicializa o cliente do Storage
const storage = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

// Nome do seu bucket no Google Cloud
const libra = 'libra_tcc';

async function testarAcesso() {
    try {
        const [buckets] = await storage.getBuckets();
        console.log('Buckets disponíveis:', buckets.map(b => b.name));
    } catch (error) {
        console.error('Erro ao acessar o Storage:', error);
    }
}

testarAcesso();
