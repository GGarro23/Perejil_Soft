const db = require('../config/db');
const obtenerPendientes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id AS orden_id,
        o.estado,
        o.fecha,
        m.numero AS mesa,
        p.nombre AS producto,
        oi.cantidad,
        oi.nota
      FROM ordenes o
      JOIN mesas m ON o.mesa_id = m.id
      JOIN orden_items oi ON oi.order_id = o.id
      JOIN productos p ON oi.producto_id = p.id
      WHERE o.estado IN ('pendiente', 'en preparacion')
      ORDER BY o.fecha ASC
    `);

    const ordenesMap = {};

    rows.forEach(row => {
      if (!ordenesMap[row.orden_id]) {
        ordenesMap[row.orden_id] = {
          id: row.orden_id,
          estado: row.estado,
          fecha: row.fecha,
          mesa: row.mesa,
          productos: []
        };
      }

      ordenesMap[row.orden_id].productos.push({
        nombre: row.producto,
        cantidad: row.cantidad,
        nota: row.nota
      });
    });

    res.json(Object.values(ordenesMap));
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener órdenes" });
  }
};
const detalleOrden = async (req, res) => {

    const { id } = req.params;

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
            JOIN productos p ON oi.producto_id = p.id
            WHERE oi.order_id = ?
            `,
            [id]
        );

        res.json(items);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener detalle'
        });

    }

};
const cambiarEstado = async (req, res) => {

    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = [
        'en preparacion',
        'listo'
    ];

    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({
            mensaje: 'Estado inválido'
        });
    }

    try {

        await db.query(
            `
            UPDATE ordenes
            SET estado = ?
            WHERE id = ?
            `,
            [estado, id]
        );

        res.json({
            mensaje: 'Estado actualizado'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar estado'
        });

    }

};
module.exports = {
    obtenerPendientes,
    detalleOrden,
    cambiarEstado
};