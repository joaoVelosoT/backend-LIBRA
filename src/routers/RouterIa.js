const express = require("express");
const router = express.Router();
const perguntarIA = require("../services/Iaservice");
const Book = require("../models/Book");
const { Op } = require("sequelize");

const ROUTE_TIMEOUT = 15000;

function cleanBookData(livros) {
  return livros.map(livro => {
    if (livro.descricao && livro.descricao.includes("Harry Potter e a Pedra Filosofal")) {
      livro.descricao = null;
    }
    return livro;
  });
}

router.post("/perguntar", async (req, res) => {
  req.setTimeout(ROUTE_TIMEOUT, () => {
    res.status(504).json({
      error: "Timeout",
      message: "A solicitação demorou muito para ser processada."
    });
  });

  try {
    const { pergunta } = req.body;
    
    if (!pergunta || typeof pergunta !== "string" || pergunta.trim().length < 2) {
      return res.status(400).json({
        error: "Pergunta inválida",
        message: "Por favor, faça uma pergunta com pelo menos 2 caracteres."
      });
    }

    const livros = await Book.findAll({
      attributes: ['id', 'titulo', 'autor', 'generos', 'descricao', 'notaMedia'],
      where: {
        titulo: { [Op.ne]: null }
      },
      limit: 50,
      order: [['createdAt', 'DESC']]
    });

    const livrosLimpos = cleanBookData(livros);

    const resposta = await Promise.race([
      perguntarIA(pergunta, livrosLimpos),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), ROUTE_TIMEOUT - 1000)
      )
    ]);

    res.json({
      resposta,
      metadata: {
        livrosDisponiveis: livros.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Erro na rota /perguntar:", {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    res.status(500).json({
      error: "Erro no servidor",
      message: "Estamos enfrentando dificuldades técnicas. Por favor, tente novamente mais tarde.",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = router;