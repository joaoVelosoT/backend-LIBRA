const { Op } = require('sequelize');
const Book = require("../../models/Book");

const BookSearchService = {
    getByQuery: async (query = {}) => {
        try {
            // Filtra apenas os campos válidos e não vazios
            const validFields = [
                'titulo', 'subtitulo', 'descricao', 'autor',
                'editora', 'edicao', 'ISBN13', 'ISBN10',
                'publicacao', 'paginas', 'capitulos'
            ];
            
            const where = {};
            
            for (const field of validFields) {
                if (query[field] !== undefined && query[field] !== '') {
                    // Usa busca exata para todos os campos
                    where[field] = query[field];
                }
            }

            // Busca simples sem paginação ou ordenação
            const livros = await Book.findAll({
                where,
                raw: true // Retorna apenas os dados do livro
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