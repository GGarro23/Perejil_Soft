const db = require('../config/db');

// Crear mesa
const crearMesa = async (req, res) => {

    const {
        numero,
        capacidad
    } = req.body;

    try {

        // Validar capacidad

        if (capacidad <= 0) {
            return res.status(400).json({
                mensaje:
                'La mesa debe tener una capacidad mayor a 0'
            });
        }

        // Verificar si ya existe

        const [mesaExistente] =
            await db.query(
                `
                SELECT id
                FROM mesas
                WHERE numero = ?
                `,
                [numero]
            );

        if (mesaExistente.length > 0) {
            return res.status(400).json({
                mensaje:
                'Ya existe una mesa con ese número'
            });
        }

        await db.query(
            `
            INSERT INTO mesas
            (
                numero,
                capacidad
            )
            VALUES (?, ?)
            `,
            [
                numero,
                capacidad
            ]
        );

        res.status(201).json({
            mensaje: 'Mesa creada'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje:
            'Error al crear mesa'
        });
    }
};
// Listar mesas
const obtenerMesas = async (req, res) => {

    try {

        const [mesas] = await db.query(
            `
            SELECT *
            FROM mesas
            ORDER BY numero
            `
        );

        res.json(mesas);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener mesas'
        });
    }
};

// Editar mesa
const editarMesa = async (req, res) => {

    const { id } = req.params;

    const {
        numero,
        capacidad,
        activa
    } = req.body;

    try {

        await db.query(
            `
            UPDATE mesas
            SET
                numero = ?,
                capacidad = ?,
                activa = ?
            WHERE id = ?
            `,
            [
                numero,
                capacidad,
                activa,
                id
            ]
        );

        res.json({
            mensaje: 'Mesa actualizada'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar mesa'
        });
    }
};

// Cambiar disponible / ocupada
const cambiarEstadoMesa = async (req, res) => {

    const { id } = req.params;

    try {

        await db.query(
            `
            UPDATE mesas
            SET activa = NOT activa
            WHERE id = ?
            `,
            [id]
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

// Eliminar mesa
const eliminarMesa = async (req, res) => {

    const { id } = req.params;

    try {

        await db.query(
            `
            DELETE FROM mesas
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            mensaje: 'Mesa eliminada'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar mesa'
        });
    }
};

module.exports = {
    crearMesa,
    obtenerMesas,
    editarMesa,
    cambiarEstadoMesa,
    eliminarMesa
};