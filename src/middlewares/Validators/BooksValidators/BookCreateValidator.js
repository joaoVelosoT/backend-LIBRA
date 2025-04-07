const BookCreateValidator = async (req, res, next) => {
  try {
    const {
      titulo,
      descricao,
      autor,
      editora,
      publicacao,
      ISBN13,
      ISBN10,
      paginas,
      capitulos,
      generos
    } = req.body;

    const errors = [];
    let generosArray = [];

    // Validações básicas dos campos obrigatórios
    if (!titulo) {
      errors.push({
        field: "titulo",
        message: "O 'titulo' é obrigatório",
      });
    }

    if (!descricao) {
      errors.push({
        field: "descricao",
        message: "A 'descricao' é obrigatória",
      });
    }

    if (!autor) {
      errors.push({
        field: "autor",
        message: "O 'autor' é obrigatório",
      });
    }

    if (!paginas) {
      errors.push({
        field: "paginas",
        message: "O número de 'paginas' é obrigatório",
      });
    }

    if (!capitulos) {
      errors.push({
        field: "capitulos",
        message: "O número de 'capitulos' é obrigatório",
      });
    }

    if (!publicacao) {
      errors.push({
        field: "publicacao",
        message: "A data de 'publicacao' é obrigatória",
      });
    }

    // Validação de gêneros
    if (!generos) {
      errors.push({
        field: "generos",
        message: "Os 'generos' são obrigatórios",
      });
    } else {
      // Se generos for uma string (JSON stringificado ou único valor)
      if (typeof generos === 'string') {
        try {
          // Tenta parsear como JSON
          generosArray = JSON.parse(generos);
          if (!Array.isArray(generosArray)) {
            // Se não for um array JSON, trata como valor único
            generosArray = [generos];
          }
        } catch (e) {
          // Se falhar ao parsear JSON, trata como valor único
          generosArray = [generos];
        }
      } 
      // Se generos for um array (quando enviado como múltiplos campos com o mesmo nome)
      else if (Array.isArray(generos)) {
        generosArray = generos;
      }
      // Outros casos (deveria ser impossível)
      else {
        generosArray = [generos];
      }

      // Valida se o array resultante é válido
      if (!Array.isArray(generosArray) || generosArray.length === 0) {
        errors.push({
          field: "generos",
          message: "deve ter pelo menos um 'genero'",
        });
      }
    }

    // Validações adicionais
    if (ISBN13 && ISBN13.length !== 13) {
      errors.push({
        field: "ISBN13",
        message: "O 'ISBN13' deve ter 13 caracteres",
      });
    }

    if (ISBN10 && ISBN10.length !== 10) {
      errors.push({
        field: "ISBN10",
        message: "O 'ISBN10' deve ter 10 caracteres",
      });
    }

    if (errors.length > 0) {
      return res.status(400).json({
        code: 400,
        errors,
        message: "Erro ao validar o livro",
        success: false,
      });
    }

    req.bookData = {
      titulo,
      descricao,
      autor,
      editora,
      publicacao,
      ISBN13,
      ISBN10,
      paginas,
      capitulos,
      generos: generosArray
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      error: {
        details: [
          {
            validator: "BookCreateValidator",
            message: "Erro interno",
          },
        ],
      },
      message: "Erro no BookCreateValidator",
      success: false,
    });
  }
};
module.exports = BookCreateValidator;