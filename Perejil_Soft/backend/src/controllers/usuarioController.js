const db = require('../config/db');
const bcrypt = require('bcrypt');
const crearUsuario = async (req, res) => {

    const {
        nombre,
        username,
        password,
        rol
    } = req.body;

    try {

        // Validar campos vacíos

        if (
            !nombre ||
            !username ||
            !password ||
            !rol
        ) {
            return res.status(400).json({
                mensaje:
                    'Todos los campos son obligatorios'
            });
        }

        // Validar contraseña

        if (password.length < 8) {
            return res.status(400).json({
                mensaje:
                    'La contraseña debe tener al menos 8 caracteres'
            });
        }

        // Verificar usuario repetido

        const [usuarioExistente] =
            await db.query(
                `
                SELECT id
                FROM usuarios
                WHERE username = ?
                `,
                [username]
            );

        if (usuarioExistente.length > 0) {
            return res.status(400).json({
                mensaje:
                    'El nombre de usuario ya existe'
            });
        }

        const hash =
            await bcrypt.hash(
                password,
                10
            );

        await db.query(
            `
            INSERT INTO usuarios
            (
                nombre,
                username,
                password,
                rol
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                nombre,
                username,
                hash,
                rol
            ]
        );

        res.status(201).json({
            mensaje:
                'Usuario creado'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error'
        });

    }

};
const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, username, rol } = req.body;

    try {
        await db.query(
            `
            UPDATE usuarios
            SET nombre = ?, username = ?, rol = ?
            WHERE id = ?
            `,
            [nombre, username, rol, id]
        );
        if (id == 1) {
            return res.status(400).json({
                mensaje: "No se puede editar el usuario administrador"
            });
        }
        res.json({
            mensaje: "Usuario actualizado"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar usuario"
        });
    }
};
const obtenerUsuarios = async (req, res) => {

    try {

        const [usuarios] =
            await db.query(`
                SELECT
                    id,
                    nombre,
                    username,
                    rol
                FROM usuarios
            `);

        res.json(usuarios);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error"
        });

    }

};

const eliminarUsuario = async (req, res) => {

    const { id } = req.params;

    try {

        await db.query(
            `
            DELETE FROM usuarios
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            mensaje:
                "Usuario eliminado"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error"
        });

    }

};

module.exports = {
    crearUsuario,
    editarUsuario,
    obtenerUsuarios,
    eliminarUsuario
};