const conn = require('../database/conn');
const crypto = require('crypto');

module.exports = {

    async index(req, res){
        const ongs = await conn('ongs').select('*');
        return res.json(ongs);
    },

    async create(req, res){
        const { nome, email, whatsapp, city, uf} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await conn('ongs').insert({
            id, nome, email, whatsapp, city, uf
        })
        return res.json({id});
    }
}