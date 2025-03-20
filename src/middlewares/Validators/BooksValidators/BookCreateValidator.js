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
      capitulos
    } = req.body;

    const errors = [];

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
        field: "autor",
        message: "O número de 'paginas' é obrigatório",
      });
    }
    if (!capitulos) {
      errors.push({
        field: "autor",
        message: "O número de 'capitulos' é obrigatório",
      });
    }
    if (!publicacao) {
      errors.push({
        field: "autor",
        message: "A data de 'publicacao' é obrigatória",
      });
    }

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