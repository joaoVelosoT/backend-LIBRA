// services/UsersServices/UserGetOneService.js
const User = require("../../models/User");
const Book = require("../../models/Book");
const UserDisabled = require("../../models/UsersDisableds");
const Disabled = require("../../models/Disabled");
const TypesDisabled = require("../../models/TypesDisabled");

const UserGetOneService = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'isDisabled', 'favoritos', 'lidos', 'desejoLeitura', 'createdAt', 'updatedAt'],
      include: [
        {
          association: 'userDisabledInfo',
          include: [
            {
              association: 'disabled',
              include: [
                {
                  association: 'typeDisabled',
                  attributes: ['id', 'name']
                }
              ],
              attributes: ['id', 'name']
            }
          ],
          required: false
        }
      ]
    });

    if (!user) {
      return {
        code: 404,
        message: "Usuário não encontrado",
        success: false
      };
    }

    const userData = user.get({ plain: true });

    // Busca os livros favoritos se existirem
    let livrosFavoritos = [];
    if (userData.favoritos && userData.favoritos.length > 0) {
      livrosFavoritos = await Book.findAll({
        where: { id: userData.favoritos },
        attributes: ['id', 'titulo', 'autor', 'notaMedia']
      });
    }

    let livrosLidos = [];
    if (userData.lidos && userData.lidos.length > 0) {
      livrosLidos = await Book.findAll({
        where: { id: userData.lidos },
        attributes: ['id', 'titulo', 'autor', 'notaMedia']
      });
    }

    let desejoLeitura = [];
    if (userData.desejoLeitura && userData.desejoLeitura.length > 0) {
      desejoLeitura = await Book.findAll({
        where: { id: userData.desejoLeitura },
        attributes: ['id', 'titulo', 'autor', 'notaMedia']
      })
    }

    return {
      code: 200,
      data: {
        ...userData,
        livrosFavoritos: livrosFavoritos,
        livrosLidos: livrosLidos,
        desejoLeitura: desejoLeitura,
        deficiencia: userData.userDisabledInfo ? {
          tipo: userData.userDisabledInfo.disabled?.typeDisabled?.name,
          deficiencia: userData.userDisabledInfo.disabled?.name,
          idTipo: userData.userDisabledInfo.disabled?.typeDisabled?.id,
          idDeficiencia: userData.userDisabledInfo.disabled?.id
        } : null
      },
      message: "Usuário encontrado com sucesso",
      success: true
    };
  } catch (error) {
    console.error("Erro no UserGetOneService:", error);
    return {
      code: 500,
      error: {
        details: [{
          service: "UserGetOneService",
          message: error.message
        }]
      },
      message: "Erro ao buscar usuário",
      success: false
    };
  }
};

module.exports = UserGetOneService;