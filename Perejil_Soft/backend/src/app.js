require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes =require('./routes/productoRoutes');
const mesaRoutes =require('./routes/mesaRoutes');
const ordenRoutes =require('./routes/ordenRoutes');
const cocinaRoutes = require('./routes/cocinaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');
const dashboardRoutes =require("./routes/dashboardRoutes");
const ventaRoutes = require('./routes/ventaRoutes');
const facturaRoutes = require('./routes/facturaRoutes');
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/usuarios',usuarioRoutes);
app.use('/api/productos',productoRoutes);
app.use('/api/mesas',mesaRoutes);
app.use('/api/ordenes',ordenRoutes);
app.use('/api/cocina', cocinaRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/facturas', facturaRoutes);
app.listen(4000, () => {
    console.log('Servidor corriendo en puerto 4000');
}); 