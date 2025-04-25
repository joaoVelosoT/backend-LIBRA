const { Op, Sequelize } = require('sequelize');
const Book = require("../../models/Book");
const Capa = require("../../models/Capa");
const Banner = require("../../models/Banner");
const Arquivos = require("../../models/Arquivos");
const AudioBook = require("../../models/Audiobook");
const Ebook = require("../../models/Ebook");

const BookSearchService = {
    getByQuery: async (query = {}) => {
        try {
            // Filtra apenas os campos válidos e não vazios
            const validFields = [
                'titulo', 'subtitulo', 'descricao', 'autor',
                'editora', 'edicao', 'ISBN13', 'ISBN10',
                'publicacao', 'paginas', 'generos'
            ];

            const where = {};

            for (const field of validFields) {
                if (query[field] !== undefined && query[field] !== '') {

                    if (field === 'generos') {
                        where[field] = Sequelize.literal(`JSON_CONTAINS(generos, '["${query[field]}"]')`);
                    } else {
                        where[field] = query[field];
                    }
                }
            }


            // Busca simples sem paginação ou ordenação
            const livros = await Book.findAll({
                where,
                include: [
                    {
                        model: Capa,
                        as: 'capa',
                        include: [{ model: Arquivos, as: 'arquivo' }]
                    },
                    {
                        model: Banner,
                        as: 'banner',
                        include: [{ model: Arquivos, as: 'arquivo' }]
                    },
                    {
                        model: AudioBook,
                        as: 'audiobook', // Usando o singular
                        include: [{ model: Arquivos, as: 'arquivo' }]
                    },
                    {
                        model: Ebook,
                        as: 'ebook', // Usando o singular
                        include: [{ model: Arquivos, as: 'arquivo' }]
                    }
                ],
                raw: true
            });

            return {
                code: livros.length > 0 ? 200 : 404,
                success: livros.length > 0,
                message: livros.length > 0
                    ? 'Livro(s) encontrado(s)'
                    : 'Nenhum livro encontrado com os critérios fornecidos',
                data: livros
            };

        } catch (error) {
            console.error('Erro na busca de livros:', error);
            return {
                code: 500,
                success: false,
                message: 'Erro interno na busca de livros',
                error: error.message
            };
        }
    }
}

module.exports = BookSearchService;