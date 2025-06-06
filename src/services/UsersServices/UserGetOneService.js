const User = require("../../models/User");
const Book = require("../../models/Book");
const UserDisabled = require("../../models/UsersDisableds");
const Disabled = require("../../models/Disabled");
const TypesDisabled = require("../../models/typesDisabled");

const UserGetOneService = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: [
        'id',
        'name',
        'email',
        'isDisabled',
        'favoritos',
        'lidos',
        'lidosIds', // <- NOVO
        'desejoLeitura',
        'desejoLeituraIds', // <- NOVO
        'id_perfil_link',
        'createdAt',
        'updatedAt'
      ],
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

    // Livros Favoritos
    let livrosFavoritos = [];
    if (userData.favoritos?.length > 0) {
      livrosFavoritos = await Book.findAll({
        where: { id: userData.favoritos },
        attributes: ['id', 'titulo', 'autor', 'notaMedia']
      });
    }

    // Livros Lidos
    let livrosLidos = [];
    if (userData.lidosIds?.length > 0) {
      livrosLidos = await Book.findAll({
        where: { id: userData.lidosIds },
        attributes: ['id', 'titulo', 'autor', 'notaMedia']
      });
    }

    // Livros Desejo Leitura
    let desejoLeitura = [];
    if (userData.desejoLeituraIds?.length > 0) {
      desejoLeitura = await Book.findAll({
        where: { id: userData.desejoLeituraIds },
        attributes: ['id', 'titulo', 'autor', 'notaMedia']
      });
    }

    return {
      code: 200,
      data: {
        ...userData,
        livrosFavoritos,
        livrosLidos,
        desejoLeitura,
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
