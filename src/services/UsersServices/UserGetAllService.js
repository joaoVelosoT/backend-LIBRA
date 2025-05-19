// services/UsersServices/UserGetAllService.js
const User = require("../../models/User");
const Book = require("../../models/Book");
const UserDisabled = require("../../models/UsersDisableds");
const Disabled = require("../../models/Disabled");
const TypesDisabled = require("../../models/typesDisabled");

const UserGetAllService = async (query) => {
  try {
    const { onlyDisabled = false } = query;

    const baseOptions = {
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
    };

    if (onlyDisabled === "true") {
      baseOptions.where = { isDisabled: true };
      baseOptions.include[0].required = true;
    }

    const users = await User.findAll(baseOptions);

    // Para cada usuário, buscar os livros favoritos se existirem
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const userData = user.get({ plain: true });
        let favoriteBooks = [];
        let readBooks = [];
        let desejoLeitura = [];

        if (userData.favoritos && userData.favoritos.length > 0) {
          favoriteBooks = await Book.findAll({
            where: { id: userData.favoritos },
            attributes: ['id', 'titulo', 'autor', 'notaMedia']
          });
        }

        if (userData.lidos && userData.lidos.length > 0) {
          readBooks = await Book.findAll({
            where: {
              id: userData.lidos
            },
            attributes: ['id', 'titulo', 'autor', 'notaMedia']
          });
        }

        if (userData.desejoLeitura && userData.desejoLeitura.length > 0) {
          desejoLeitura = await Book.findAll({
            where: {
              id: userData.desejoLeitura
            },
            attributes: ['id', 'titulo', 'autor', 'notaMedia']
          });
        }

        return {
          ...userData,
          livrosFavoritos: favoriteBooks,
          livrosLidos: readBooks,
          desejoLeitura: desejoLeitura,
          deficiencia: userData.userDisabledInfo ? {
            tipo: userData.userDisabledInfo.disabled?.typeDisabled?.name,
            deficiencia: userData.userDisabledInfo.disabled?.name,
            idTipo: userData.userDisabledInfo.disabled?.typeDisabled?.id,
            idDeficiencia: userData.userDisabledInfo.disabled?.id
          } : null
        };
      })
    );

    if (usersWithDetails.length === 0) {
      return {
        code: 200,
        data: [],
        message: onlyDisabled === "true"
          ? "Nenhum usuário desabilitado encontrado"
          : "Nenhum usuário encontrado",
        success: true,
      };
    }

    return {
      code: 200,
      data: usersWithDetails,
      message: onlyDisabled === "true"
        ? "Todos os usuários desabilitados encontrados"
        : "Todos os usuários encontrados",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      error: {
        details: [{
          service: "UserGetAllService",
          message: error.message
        }]
      },
      message: "Erro ao buscar usuários",
      success: false
    };
  }
};

// Exportação correta como módulo
module.exports = UserGetAllService;