create database PerejilSoft;
use PerejilSoft;

-- Tablas

create table usuarios(
  id int auto_increment primary key,
  nombre varchar(100) not null,
  username varchar(50) unique not null,
  password varchar(255) not null,
  rol enum('admin','mesero','cocina') not null
);

create table productos(
  id int auto_increment primary key,
  nombre varchar(100) not null,
  descripcion text,
  precio decimal(10,2) not null,
  agotado boolean default false
);

create table mesas(
  id int auto_increment primary key,
  numero int unique not null,
  activa boolean default true,
  capacidad int not null default 4
);

create table ordenes(
  id int auto_increment primary key,
  mesa_id int not null,
  usuario_id int not null,	
  estado enum('pendiente','en preparacion','listo','cancelada') default 'pendiente',
  fecha timestamp default current_timestamp,
  foreign key (mesa_id) references mesas(id),
  foreign key (usuario_id) references usuarios(id)
);

create table orden_items(
  id int auto_increment primary key,
  order_id int,
  producto_id int,
  cantidad int,
  nota text,
  foreign key (order_id) references ordenes(id),
  foreign key (producto_id) references productos(id)
);

create table ventas(
  id int auto_increment primary key,
  orden_id int not null,
  usuario_id int not null,
  total decimal(10, 2) not null,
  metodo_pago enum('efectivo', 'tarjeta', 'transferencia') default 'efectivo',
  fecha timestamp default current_timestamp,
  foreign key (orden_id) references ordenes(id),
  foreign key (usuario_id) references usuarios(id)
);

create table facturas(
  id int auto_increment primary key,
  venta_id int not null,
  numero_factura int not null,
  cliente_nombre varchar(40) default 'Cliente',
  total decimal(10, 2) not null,
  fecha timestamp default current_timestamp,
  foreign key (venta_id) references ventas(id)
);

INSERT INTO usuarios(nombre, username, password, rol)
VALUES ('Administrador', 'admin', 'admin123', 'admin');
UPDATE usuarios
SET password = '$2b$10$.S5T3XOIEDLI1nRJEoMaTeD19JumtWMdibd7414di4CHLPNBNx2K6'
WHERE username = 'admin';