const db = require("../config/db");

const obtenerDashboard =
async (req, res) => {

    try {

        const [[usuarios]] =
            await db.query(
                `
                SELECT COUNT(*) total
                FROM usuarios
                `
            );

        const [[mesas]] =
            await db.query(
                `
                SELECT COUNT(*) total
                FROM mesas
                `
            );

        const [[productos]] =
            await db.query(
                `
                SELECT COUNT(*) total
                FROM productos
                `
            );

        const [[pedidos]] =
            await db.query(
                `
                SELECT COUNT(*) total
                FROM ordenes
                WHERE estado IN
                (
                    'pendiente',
                    'en preparacion'
                )
                `
            );

        res.json({

            usuarios:
            usuarios.total,

            mesas:
            mesas.total,

            productos:
            productos.total,

            pedidos:
            pedidos.total

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
    obtenerDashboard
};