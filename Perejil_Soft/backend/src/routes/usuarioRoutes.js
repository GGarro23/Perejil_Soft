const express = require('express');
const router = express.Router();
const verificarToken =
require('../middleware/authMiddleware');
const {
    crearUsuario,
    obtenerUsuarios,
    eliminarUsuario
} = require('../controllers/usuarioController');
router.get(
    '/',
    verificarToken,
    obtenerUsuarios
);
router.post(
    '/',
    verificarToken,
    crearUsuario
);
router.delete(
    '/:id',
    verificarToken,
    eliminarUsuario
);
module.exports = router;