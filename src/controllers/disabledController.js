const Disabled = require('../models/Disabled');

const disabledController = {
  getAll: async (req, res) => {
    try {
      const disableds = await Disabled.findAll();
      return res.status(200).json(disableds);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar deficiências.' });
    }
  },

  create: async (req, res) => {
    try {
      const { id_disabled_types, name } = req.body;

      const newDisabled = await Disabled.create({ id_disabled_types, name });
      return res.status(201).json(newDisabled);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar deficiência.' });
    }
  },


       // getById: async (req, res) => {
 // },


//  update: async (req, res) => {
//  },

//  delete: async (req, res) => {
//  };

};

module.exports = disabledController;