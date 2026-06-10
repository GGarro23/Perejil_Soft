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
    cancelarOrden,
    cerrarOrden,
    guardarNotaOrden
} = require('../controllers/ordenController');
router.post(
    '/',
    verificarToken,
    crearOrden
);
router.put(
    "/:ordenId/nota",
    verificarToken,
    guardarNotaOrden
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
router.post(
    '/:ordenId/cerrar',
    verificarToken,
    cerrarOrden
);
module.exports = router;