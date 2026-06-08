const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/authMiddleware');
const {
    obtenerPendientes,
    detalleOrden,
    cambiarEstado
} = require('../controllers/cocinaController');
router.get(
    '/',
    verificarToken,
    obtenerPendientes
);
router.get(
    '/:id',
    verificarToken,
    detalleOrden
);
router.patch(
    '/:id/estado',
    verificarToken,
    cambiarEstado
);
module.exports = router;