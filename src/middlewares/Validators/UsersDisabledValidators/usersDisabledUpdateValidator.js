const UserDisabledUpdateValidator = async (req, res, next) => {
    try {
      const { idUser, idDisabled } = req.body;
      const errors = [];
  
      if (!idUser) {
        errors.push({
          field: "idUser",
          message: "O 'idUser' é obrigatório",
        });
      }
  
      if (!idDisabled) {
        errors.push({
          field: "idDisabled",
          message: "O 'idDisabled' é obrigatório",
        });
      }
  
      if (errors.length !== 0) {
        return res.status(400).json({
          code: 400,
          errors,
          message: "Erro ao validar UserDisabled",
          success: false,
        });
      }
  
      req.dataUsersDisabled = {
        idUser,
        idDisabled,
      };
  
      return next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        error: {
          details: [
            {
              validator: "UserDisabledUpdateValidator",
              message: "Erro interno",
            },
          ],
        },
        message: "Erro no UserDisabledUpdateValidator",
        success: false,
      });
    }
  };
  
  module.exports = UserDisabledUpdateValidator;
  