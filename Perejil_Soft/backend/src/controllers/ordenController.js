const db = require('../config/db');
const crearOrden = async (req, res) => {
    const { mesa_id } = req.body;
    try {
        const usuario_id = req.usuario.id;
        const [resultado] = await db.query(
            `
            INSERT INTO ordenes
            (mesa_id, usuario_id)
            VALUES (?, ?)
            `,
            [mesa_id, usuario_id]
        );
        res.status(201).json({
            mensaje: 'Orden creada',
            ordenId: resultado.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear orden'
        });
    }
};
const agregarProducto = async (req, res) => {
    const { ordenId } = req.params;
    const {
        producto_id,
        cantidad,
        nota
    } = req.body;
    try {
        const [producto] = await db.query(
            `
            SELECT *
            FROM productos
            WHERE id = ?
            `,
            [producto_id]
        );
        if (producto.length === 0) {
            return res.status(404).json({
                mensaje: 'Producto no existe'
            });
        }
        if (producto[0].agotado) {
            return res.status(400).json({
                mensaje: 'Producto agotado'
            });
        }
        await db.query(
            `
            INSERT INTO orden_items
            (order_id, producto_id, cantidad, nota)
            VALUES (?, ?, ?, ?)
            `,
            [
                ordenId,
                producto_id,
                cantidad,
                nota
            ]
        );
        res.json({
            mensaje: 'Producto agregado'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error'
        });
    }
};
const obtenerOrdenes = async (req, res) => {

    try {

        const [ordenes] =
            await db.query(
                `
                SELECT

                    o.id,

                    m.numero
                    AS mesa,

                    u.nombre
                    AS mesero,

                    o.estado,

                    o.fecha
                    AS fecha,

                    COALESCE(
                        SUM(
                            p.precio *
                            oi.cantidad
                        ),
                        0
                    ) AS total

                FROM ordenes o

                JOIN mesas m
                    ON o.mesa_id =
                    m.id

                JOIN usuarios u
                    ON o.usuario_id =
                    u.id

                LEFT JOIN
                orden_items oi
                    ON o.id =
                    oi.order_id

                LEFT JOIN
                productos p
                    ON oi.producto_id =
                    p.id

                GROUP BY
                    o.id,
                    m.numero,
                    u.nombre,
                    o.estado,
                    o.fecha

                ORDER BY
                    o.id DESC
                `
            );

        res.json(
            ordenes
        );

    } catch (error) {

        console.error(
            error
        );

        res.status(500).json({

            mensaje:
            "Error"

        });

    }

};
const obtenerOrden = async (req, res) => {
    const { ordenId } = req.params;
    try {
        const [items] = await db.query(
            `
            SELECT
                oi.id,
                p.nombre,
                p.precio,
                oi.cantidad,
                oi.nota,
                (p.precio * oi.cantidad) AS subtotal

            FROM orden_items oi

            JOIN productos p
                ON oi.producto_id = p.id

            WHERE oi.order_id = ?
            `,
            [ordenId]
        );
        let total = 0;
        items.forEach(item => {
            total += item.subtotal;
        });
        res.json({
            items,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error'
        });
    }
};
const enviarACocina = async (req, res) => {
    const { ordenId } = req.params;
    try {
        await db.query(
            `
            UPDATE ordenes
            SET estado = 'pendiente'
            WHERE id = ?
            `,
            [ordenId]
        );
        res.json({
            mensaje: 'Orden enviada'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error'
        });
    }

};
const cancelarOrden = async (req, res) => {
    const { ordenId } = req.params;
    try {
        const [orden] = await db.query(
            `
            SELECT estado
            FROM ordenes
            WHERE id = ?
            `,
            [ordenId]
        );
        if (
            orden[0].estado ===
            'en preparacion'
        ) {
            return res.status(400).json({
                mensaje:
                'No puede cancelarse'
            });
        }
        await db.query(
            `
            UPDATE ordenes
            SET estado = 'cancelada'
            WHERE id = ?
            `,
            [ordenId]
        );
        res.json({
            mensaje: 'Orden cancelada'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error'
        });
    }
};

const cerrarOrden = async(req, res) => {
    const { ordenId } = req.params;
    const { metodo_pago = 'efectivo' } = req.body;
    try{
        const usuario_id = req.usuario.id;
        const [items] = await db.query(
            `
            SELECT SUM(p.precio * oi.cantidad) AS total
            FROM orden_items oi
            JOIN productos p ON oi.producto_id = p.id
            WHERE oi.order_id = ?
            `,
            [ordenId]
        );
        const total = items[0].total || 0;
        await db.query(
            `
            UPDATE ordenes SET estado = 'listo' WHERE id = ?
            `,
            [ordenId]
        );
        const [venta] = await db.query(
            `
            INSERT INTO ventas (orden_id, usuario_id, total, metodo_pago)
            VALUES (?, ?, ?, ?)
            `, 
            [ordenId, usuario_id, total, metodo_pago]
        );
        const numeroFactura = venta.insertId;;
        await db.query(
            `
            INSERT INTO facturas (venta_id, numero_factura, total)
            VALUES (?, ?, ?)
            `,
            [venta.insertId, numeroFactura, total]
        );
        res.json({ mensaje: 'Orden cerrada', ventaId: venta.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al cerrar orden' });
    }
};

module.exports = {

    crearOrden,

    agregarProducto,

    obtenerOrden,

    obtenerOrdenes,

    enviarACocina,

    cancelarOrden,

    cerrarOrden

};