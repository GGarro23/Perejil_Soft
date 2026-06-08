const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    const { username, password } = req.body;

    try {

        const [usuarios] = await db.query(
            'SELECT * FROM usuarios WHERE username = ?',
            [username]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        const usuario = usuarios[0];

        const coincide = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!coincide) {
            return res.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        res.json({
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

module.exports = { login };