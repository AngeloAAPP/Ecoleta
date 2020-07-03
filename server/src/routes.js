const {Router} = require('express')
const router = Router();

// importação das rotas
const points = require('./routes/points')
const itens = require('./routes/itens')

router.use('/points', points)
router.use('/itens', itens)

module.exports = router;