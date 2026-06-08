const db = require('../config/db');
const historialOrdenes = async (req, res) => {

    try {

        const [ordenes] = await db.query(
            `
            SELECT 
                o.id,
                o.fecha,
                o.estado,
                m.numero AS mesa,
                u.nombre AS usuario
            FROM ordenes o
            JOIN mesas m ON o.mesa_id = m.id
            JOIN usuarios u ON o.usuario_id = u.id
            ORDER BY o.fecha DESC
            `
        );

        res.json(ordenes);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener historial'
        });

    }

};
const ventasPorFecha = async (req, res) => {

    const { inicio, fin } = req.query;

    try {

        const [resultados] = await db.query(
            `
            SELECT 
                o.id,
                o.fecha,
                SUM(p.precio * oi.cantidad) AS total
            FROM ordenes o
            JOIN orden_items oi ON o.id = oi.order_id
            JOIN productos p ON oi.producto_id = p.id
            WHERE o.estado = 'listo'
            AND DATE(o.fecha) BETWEEN ? AND ?
            GROUP BY o.id
            ORDER BY o.fecha DESC
            `,
            [inicio, fin]
        );

        let totalGeneral = 0;

        resultados.forEach(r => {
            totalGeneral += r.total;
        });

        res.json({
            ventas: resultados,
            totalGeneral
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error en reporte'
        });

    }

};
const facturaOrden = async (req, res) => {

    const { id } = req.params;

    try {

        const [orden] = await db.query(
            `
            SELECT 
                o.id,
                o.fecha,
                o.estado,
                m.numero AS mesa,
                u.nombre AS mesero
            FROM ordenes o
            JOIN mesas m ON o.mesa_id = m.id
            JOIN usuarios u ON o.usuario_id = u.id
            WHERE o.id = ?
            `,
            [id]
        );

        const [items] = await db.query(
            `
            SELECT 
                p.nombre,
                oi.cantidad,
                p.precio,
                (p.precio * oi.cantidad) AS subtotal
            FROM orden_items oi
            JOIN productos p ON oi.producto_id = p.id
            WHERE oi.order_id = ?
            `,
            [id]
        );

        let total = 0;

        items.forEach(i => {
            total += i.subtotal;
        });

        res.json({
            orden: orden[0],
            items,
            total,
            fechaImpresion: new Date()
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al generar factura'
        });

    }

};
module.exports = {
    historialOrdenes,
    ventasPorFecha,
    facturaOrden
};