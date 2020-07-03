const {consultaSQL} = require('../database/exec')
const {baseURL} = require('../config/server')

module.exports = {
    //Lista os itens de coleta
    index: async (req,res, next) => {
        const itens = await consultaSQL("select * from itens");

        const serializedItens = itens.map(item => {
            return {
                id: item.id,
                titulo: item.titulo,
                url_imagem: `${baseURL}/image/${item.imagem}`
            }
       })

        return res.json(serializedItens)
    },
}