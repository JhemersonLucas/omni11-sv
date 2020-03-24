const conn = require('../database/conn');
const crypto = require('crypto');

module.exports = {

    async index(req, res){
        const ong_id = req.headers.authorization;
        const casos = await conn('casos').where('ong_id', ong_id).select('*');
        return res.json(casos);
    },

}