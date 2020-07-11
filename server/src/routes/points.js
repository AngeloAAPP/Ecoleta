const {Router} = require('express')
const {celebrate} = require('celebrate')

const router = Router()
const multer = require('multer')
const multerConfig = require('../config/multer')

const upload = multer(multerConfig)

const {index, show, validation, create} = require('../controllers/pointsController')

router.get('/', index)
router.get('/:id', show)
router.post('/', upload.single('imagem'), celebrate(validation), create)


module.exports = router