const express = require('express');
const router = express.Router();
const verificarToken = 
require('../middleware/authMiddleware');

const { 
    getFacturas, 
    getDetallesFactura 
} = require('../controllers/facturaController');

router.get(
    '/', 
    verificarToken, 
    getFacturas
);

router.get(
    '/:id', 
    verificarToken, 
    getDetallesFactura
);

module.exports = router;