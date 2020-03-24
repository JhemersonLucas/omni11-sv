const conn = require('../database/conn');
const crypto = require('crypto');

module.exports = {

    async create(req, res){
        const { id } = req.body;
        const ong = await conn('ongs').where('id', id).select('nome').first();
        if(!ong){
            return res.status(400).json({erro: 'Não autorizado!'})
        }
        return res.json(ong);
    },

}