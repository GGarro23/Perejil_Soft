const express = require('express');
const router = express.Router();
const verificarToken =
require('../middleware/authMiddleware');
const {
    crearUsuario,
    editarUsuario,
    obtenerUsuarios,
    eliminarUsuario
} = require('../controllers/usuarioController');
router.get(
    '/',
    verificarToken,
    obtenerUsuarios
);
router.put(
    "/:id",
     verificarToken,
     editarUsuario
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