const express = require('express');
const router = express.Router();
const verificarToken =require('../middleware/authMiddleware');
const {
    historialOrdenes,
    ventasPorFecha,
    facturaOrden
} = require('../controllers/reporteController');
router.get(
    '/historial',
    verificarToken,
    historialOrdenes
);
router.get(
    '/ventas',
    verificarToken,
    ventasPorFecha
);
router.get(
    '/factura/:id',
    verificarToken,
    facturaOrden
);
module.exports = router;