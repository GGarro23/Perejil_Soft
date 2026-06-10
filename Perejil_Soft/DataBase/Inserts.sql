use PerejilSoft;

-- Inserts
INSERT INTO usuarios(nombre, username, password, rol)
VALUES ('Administrador', 'admin', 'admin123', 'admin');
UPDATE usuarios
SET password = '$2b$10$.S5T3XOIEDLI1nRJEoMaTeD19JumtWMdibd7414di4CHLPNBNx2K6'
WHERE username = 'admin';

SELECT id, username, rol
FROM usuarios;
INSERT INTO mesas(numero, capacidad, activa)
VALUES
(1,4,true),
(3,4,true);
INSERT INTO productos(nombre, descripcion, precio, agotado)
VALUES
('Pasta Alfredo','Pasta con salsa alfredo',6400,false),
('Cafe negro','Cafe caliente',1200,false),
('Hamburguesa clasica','Hamburguesa con papas',6000,false),
('Limonada natural','Bebida natural',1500,false);
INSERT INTO ordenes(mesa_id, usuario_id, estado)
VALUES
(1,3,'pendiente'),
(2,3,'en preparacion');
INSERT INTO orden_items(order_id, producto_id, cantidad, nota)
VALUES
(1,1,1,NULL),
(1,2,1,NULL),

(2,3,2,'Sin cebolla'),
(2,4,2,NULL);
SELECT * FROM ordenes;
INSERT INTO ordenes (mesa_id, usuario_id, estado)
VALUES
(1, 2, 'pendiente'),
(2, 2, 'en preparacion');
INSERT INTO orden_items (order_id, producto_id, cantidad, nota)
VALUES
-- Orden #3
(3, 3, 1, 'Sin tomate'),
(3, 4, 2, NULL),

-- Orden #4
(4, 1, 2, NULL),
(4, 2, 1, 'Extra caliente');