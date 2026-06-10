const db = require('../config/db');

const getFacturas = async (req, res) => {
    try{
        const [facturas] = await db.query(
            `
            SELECT f.id, f.numero_factura, v.orden_id, m.numero AS mesa,
            v.metodo_pago, v.total, v.fecha
            FROM facturas f
            JOIN ventas v ON f.venta_id = v.id
            JOIN ordenes o ON v.orden_id = o.id
            JOIN mesas m ON o.mesa_id = m.id
            ORDER BY f.id DESC
            `
        );
        res.json(facturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error' });
    }
};

const getDetallesFactura = async (req, res) => {
    const { id } = req.params;
    try{
        const [factura] = await db.query(
            `
            SELECT f.*, v.metodo_pago, v.total, v.orden_id, m.numero AS mesa
            FROM facturas f
            JOIN ventas v ON f.venta_id = v.id
            JOIN ordenes o ON v.orden_id = o.id
            JOIN mesas m ON o.mesa_id = m.id
            WHERE f.id = ?
            `,
            [id]
        );

        const [items] = await db.query(
            `
            SELECT p.nombre, oi.cantidad, p.precio, (p.precio * oi.cantidad) AS subtotal
            FROM orden_items oi
            JOIN productos p ON oi.producto_id = p.id
            WHERE oi.order_id = ?
            `,
            [factura[0].orden_id]
        );
        res.json({ ...factura[0], items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error' });
    }
};

module.exports = { 

    getFacturas,

    getDetallesFactura
    
};