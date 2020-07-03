const {metodoSQL, consultaSQL} = require('../database/exec')
const {baseURL} = require('../config/server')
const {Joi} = require('celebrate')

module.exports = {
    //Lista pontos atendendo os filtros de cidade, estado, e itens
    index: async(req,res) => {
        const {cidade, uf, itens} = req.query;

        const parsedItens = itens.split(",").map(item => Number(item.trim()))
        
        const query = `
            select distinct points.* 
            from points join point_itens 
            on points.id = point_itens.point_id
            where cidade = '${cidade}' and uf = '${uf}' and point_itens.item_id in (${parsedItens})
        `
        try{
            const points = await consultaSQL(query);
            const serializedPoints = points.map(point => (
                {
                    ...point,
                    imagem: `${baseURL}/image/${point.imagem}`
                }
            ))
            return res.json({
                sucess: true,
                data: serializedPoints
            });
        }
        catch(err){
            return res.status(400).json({
                sucess:false,
                err: "Parâmetros inválidos"
            })
        }
    },
    //Lista um ponto específico
    show: async(req,res) => {
        const {id} = req.params;

        const queryPoint = `
            select * from points
            where id = ${id};
        `

        const queryItens = `
            select titulo
            from itens join point_itens
            on itens.id = point_itens.item_id
            where point_itens.point_id = ${id};
        `
        
        const [point] = await consultaSQL(queryPoint);

        if(!point)
        return res.status(400).json({
            sucess:false,
            err: "Ponto de coleta não encontrado"
        })

        const itens = await consultaSQL(queryItens);
        
        
        return res.json({
            sucess: true,
            data: {
                point: {
                    ...point, imagem: `${baseURL}/image/${point.imagem}`
                },
                itens
            }
        })

    },
    //Cria um ponto de coleta
    create: async (req,res, next) => {
        let queryItensString = ``;
        const {nome, email, whatsapp, latitude, longitude, cidade, uf, itens} = req.body;
        let imagem = req.file.filename;

        const queryItens = itens.split(',').map(item => +item.trim()).map((item) => {
            return `insert into point_itens(point_id, item_id)
                    values((select top 1 id from points order by id desc), ${item});`
        })

        //Coloca Todas as strings do vetor de itens em apenas uma
        queryItens.forEach(queryItem => {
            queryItensString += queryItem
        });


        
        const sql = `
            BEGIN TRANSACTION
            insert into points(imagem, nome, email, whatsapp, latitude, longitude, cidade, uf)
            values('${imagem}', '${nome}', '${email}', '${whatsapp}', ${latitude}, ${longitude}, '${cidade}', '${uf}');

            ${queryItensString}
            
            IF @@ERROR = 0
            COMMIT
            ELSE
            ROLLBACK
        `

        const retorno = await metodoSQL(sql)    
        
        if(!retorno.status){
            next();
            return res.status(400).json({
                sucess: false,
                err: retorno.err
            })
        }
        
        const point = {
            imagem: `${baseURL}/image/${imagem}`,
            nome,
            email,
            whatsapp,
            latitude,
            longitude,
            cidade,
            uf,
            itens
        }
        return res.json({
            sucess: true,
            data: point
        })
    },
    //Faz a validação dos campos recebidos na requisição
    validation: {
            body: Joi.object().keys({
                nome: Joi.string().min(3).max(50).required(),
                email: Joi.string().email().required(),
                whatsapp: Joi.string().min(11).max(11).required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                cidade: Joi.string().required(),
                uf: Joi.string().min(2).max(2).required(),
                itens: Joi.string().regex(/^(\d,)*[\d]$/),
            })
    },
}