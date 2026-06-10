const db = require('../config/db');

const getVentas = async (req, res) => {
    const { desde, hasta } = req.query;
    try{
        const [totales] = await db.query(
            `SELECT SUM(total) AS totalVendido, COUNT(id) AS cantidadPedidos
             FROM ventas
             WHERE DATE(fecha) BETWEEN ? AND ?`,
            [desde, hasta]
        );
        const [producto] = await db.query(
            `SELECT p.nombre AS productoMasVendido
             FROM orden_items oi
             JOIN productos p ON oi.producto_id = p.id
             JOIN ventas v ON oi.order_id = v.orden_id
             WHERE DATE(v.fecha) BETWEEN ? AND ?
             GROUP BY p.id
             ORDER BY SUM(oi.cantidad) DESC
             LIMIT 1`,
            [desde, hasta]
        );
        const [porDia] = await db.query(
            `
            SELECT DATE_FORMAT(fecha, '%Y-%m-%d') AS dia, SUM(total) AS total
            FROM ventas 
            WHERE DATE(fecha) BETWEEN ? AND ?
            GROUP BY DATE_FORMAT(fecha, '%Y-%m-%d')
            ORDER BY dia ASC
            `,
            [desde, hasta]
        );
        res.json({ resumen: { ...totales[0], ...producto[0] }, porDia });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error" });
    }
};

module.exports = { 
    getVentas 
};