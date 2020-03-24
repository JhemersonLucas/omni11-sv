const conn = require('../database/conn');
const crypto = require('crypto');

module.exports = {

    async index(req, res){
        const { page = 1 } = req.query;
        const [count] = await conn('casos').count();
        const casos = await conn('casos')
        .join('ongs', 'ong_id', '=', 'casos.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['casos.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        res.header('X-Total-Count', count['count(*)']);
        return res.json(casos);
    },

    async create(req, res){
        const ong_id = req.headers.authorization;
        const { titulo, descricao, valor } = req.body;
        const [id] = await conn('casos').insert({
            titulo, descricao, valor, ong_id
        })
        return res.json({id});
    },

    async delete(req, res){
        const ong_id = req.headers.authorization;
        const { id } = req.params;

        const caso = await conn('casos').where('id', id).select('ong_id').first();

        if(caso.ong_id != ong_id){
            return res.status(401).json({erro: 'Operação não permitida'})
        }

        await conn('casos').where('id', id).delete();

        return res.status(204).send();
    }
}