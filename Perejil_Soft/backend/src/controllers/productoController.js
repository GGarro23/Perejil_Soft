const db = require('../config/db');
const crearProducto = async (req, res) => {
    const {
        nombre,
        descripcion,
        precio
    } = req.body;
    try {
        await db.query(
            `INSERT INTO productos
            (nombre, descripcion, precio)
            VALUES (?, ?, ?)`,
            [nombre, descripcion, precio]
        );
        res.status(201).json({
            mensaje: 'Producto creado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error del servidor'
        });
    }
};
const obtenerProductos = async (req, res) => {

    try {

        const [productos] =
            await db.query(
                'SELECT * FROM productos'
            );

        res.json(productos);

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error'
        });

    }

};

const cambiarEstadoProducto = async (req, res) => {

    const { id } = req.params;

    try {

        await db.query(
            `
            UPDATE productos
            SET agotado = NOT agotado
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            mensaje: 'Estado actualizado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error'
        });

    }

};

const eliminarProducto = async (req, res) => {

    const { id } = req.params;

    try {

        await db.query(
            `
            DELETE FROM productos
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            mensaje: 'Producto eliminado'
        });

    } catch (error) {

        res.status(500).json({
            mensaje: 'Error'
        });

    }

};
const actualizarProducto =
async (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        descripcion,
        precio
    } = req.body;

    try {

        await db.query(
            `
            UPDATE productos
            SET
                nombre = ?,
                descripcion = ?,
                precio = ?
            WHERE id = ?
            `,
            [
                nombre,
                descripcion,
                precio,
                id
            ]
        );

        res.json({
            mensaje:
            "Producto actualizado"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje:
            "Error del servidor"
        });

    }

};
module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    cambiarEstadoProducto,
    eliminarProducto
};
