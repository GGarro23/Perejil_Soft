const express = require('express');
const router = express.Router();
const verificarToken =
require('../middleware/authMiddleware');
const {
    crearOrden,
    agregarProducto,
    obtenerOrden,
    obtenerOrdenes,
    enviarACocina,
    cancelarOrden
}=require('../controllers/ordenController');
router.post(
    '/',
    verificarToken,
    crearOrden
);
router.post(
    '/:ordenId/productos',
    verificarToken,
    agregarProducto
);
router.get(
    '/',
    verificarToken,
    obtenerOrdenes
);
router.get(
    '/:ordenId',
    verificarToken,
    obtenerOrden
);
router.patch(
    '/:ordenId/enviar',
    verificarToken,
    enviarACocina
);
router.patch(
    '/:ordenId/cancelar',
    verificarToken,
    cancelarOrden
);
module.exports = router;