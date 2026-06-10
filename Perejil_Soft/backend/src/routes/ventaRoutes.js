const express = require('express');
const router = express.Router();
const verificarToken = 
require('../middleware/authMiddleware');

const { 
    getVentas
} = require('../controllers/ventaController');

router.get(
    '/', 
    verificarToken, 
    getVentas
);

module.exports = router;