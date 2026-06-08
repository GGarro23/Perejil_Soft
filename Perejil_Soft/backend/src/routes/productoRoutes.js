const express = require("express");
const router = express.Router();
const verificarToken =require("../middleware/authMiddleware");
const {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    cambiarEstadoProducto,
    eliminarProducto
} = require("../controllers/productoController");
router.post(
    "/",
    verificarToken,
    crearProducto
);
router.get(
    "/",
    verificarToken,
    obtenerProductos
);
router.put(
    "/:id",
    verificarToken,
    actualizarProducto
);
router.patch(
    "/:id/agotado",
    verificarToken,
    cambiarEstadoProducto
);
router.delete(
    "/:id",
    verificarToken,
    eliminarProducto
);
module.exports = router;