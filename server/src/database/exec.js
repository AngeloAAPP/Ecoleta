const sql = require('mssql')
const login = require('./config')

/**
 * Realiza a conexão com o banco de dados.
 */

sql.connect(login)
    .then(conexaoGlobal => {global.conn = conexaoGlobal; console.log("Conectado com sucesso")})
    .catch(erro => console.log("Falha ao se conectar ao Banco de Dados: ", erro));

/**
 * @param sql Uma consulta (select) em SQL
 */
const consultaSQL = async sql => {
    const consultaSQL = await global.conn.request().query(sql)
    return consultaSQL.recordset;
}

/**
 * @param sql Um comando (insert, update, delete, etc) em SQL que não tenha retorno
 */
const metodoSQL = async sql => {
    const ret = {
        status: true,
        err: ''
    }

    try{
        await global.conn.request().query(sql)
        return ret
    }
    catch(err){
        ret.status = false;
        ret.err = err;
        return ret;
    }
       
}

module.exports = {
    consultaSQL, metodoSQL
};