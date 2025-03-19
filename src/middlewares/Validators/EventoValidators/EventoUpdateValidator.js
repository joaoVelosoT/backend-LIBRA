const EventoUpdateValidator = async (req, res, next) => {
    try {
      const { titulo, categoria, descricao, data_evento } = req.body;
  
      const errors = [];
  
      // Validação do título (se enviado)
      if (titulo !== undefined) {
        if (titulo.trim() === "") {
          errors.push({
            field: "titulo",
            message: "O título do evento não pode ser vazio.",
          });
        } else if (titulo.trim().length < 3) {
          errors.push({
            field: "titulo",
            message: "O título do evento deve ter pelo menos 3 caracteres.",
          });
        }
      }
  
      // Validação da categoria (se enviada)
      if (categoria !== undefined) {
        if (categoria.trim() === "") {
          errors.push({
            field: "categoria",
            message: "A categoria do evento não pode ser vazia.",
          });
        } else if (categoria.trim().length < 3) {
          errors.push({
            field: "categoria",
            message: "A categoria do evento deve ter pelo menos 3 caracteres.",
          });
        }
      }
  
      // Validação da descrição (se enviada)
      if (descricao !== undefined) {
        if (descricao.trim() === "") {
          errors.push({
            field: "descricao",
            message: "A descrição do evento não pode ser vazia.",
          });
        } else if (descricao.trim().length < 10) {
          errors.push({
            field: "descricao",
            message: "A descrição do evento deve ter pelo menos 10 caracteres.",
          });
        }
      }
  
      // Validação da data do evento (se enviada)
      if (data_evento !== undefined) {
        if (data_evento.trim() === "") {
          errors.push({
            field: "data_evento",
            message: "A data do evento não pode ser vazia.",
          });
        } else {
          const data = new Date(data_evento);
          if (isNaN(data.getTime())) {
            errors.push({
              field: "data_evento",
              message: "A data do evento deve ser válida.",
            });
          } else if (data < new Date()) {
            errors.push({
              field: "data_evento",
              message: "A data do evento não pode ser no passado.",
            });
          }
        }
      }
  
      // Se houver erros, retorna a resposta com os erros
      if (errors.length > 0) {
        return res.status(400).json({
          code: 400,
          errors,
          message: "Erro ao validar os dados do evento.",
          success: false,
        });
      }
  
      // Se não houver erros, passa para o próximo middleware
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        error: {
          details: [
            {
              validator: "EventoUpdateValidator",
              message: "Erro interno",
            },
          ],
        },
        message: "Erro no EventoUpdateValidator",
        success: false,
      });
    }
  };
  
  module.exports = EventoUpdateValidator;