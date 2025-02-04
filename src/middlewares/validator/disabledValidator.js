const validateDisabledMiddleware = (req, res, next) => {
    const { id_disabled_types, name } = req.body;
  
    if (!id_disabled_types || typeof id_disabled_types !== 'number') {
      return res.status(400).json({
        error: 'Erro no ID typeDisable.',
      });
    }
  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({
        error: 'O campo "name" é obrigatório e deve ser uma string.',
      });
    }
  
    next();
  };
  
  module.exports = validateDisabledMiddleware;
  