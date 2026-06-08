const express = require('express');
const router = express.Router();
const verificarToken =
require('../middleware/authMiddleware');
const {
    crearMesa,
    obtenerMesas,
    editarMesa,
    eliminarMesa,
    cambiarEstadoMesa
} = require('../controllers/mesaController');
router.post(
    '/',
    verificarToken,
    crearMesa
);
router.get(
    '/',
    verificarToken,
    obtenerMesas
);
router.put(
    '/:id',
    verificarToken,
    editarMesa
);
router.delete(
    '/:id',
    verificarToken,
    eliminarMesa
);
router.patch(
    '/:id/estado',
    verificarToken,
    cambiarEstadoMesa
);
module.exports = router;