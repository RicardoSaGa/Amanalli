CREATE DATABASE amanalli;
USE amanalli;

-- Tabla de usuarios
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);


-- Tabla de categorías
CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria ENUM('CERAMICA', 'TEXTIL', 'DECORACION') NOT NULL DEFAULT 'CERAMICA',
    descripcion_categoria TEXT,
    estatus BOOLEAN DEFAULT TRUE
);

-- Tabla de productos
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion_producto TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(300) NOT NULL,
    id_categoria INT NOT NULL,
    id_region INT NOT NULL,
    stock INT DEFAULT 0,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria),
    FOREIGN KEY (id_region) REFERENCES Regiones(id_region),
    estatus BOOLEAN DEFAULT TRUE
   
);

-- Tabla de Regiones--
CREATE TABLE Regiones (
id_region INT auto_increment NOT NULL PRIMARY KEY,
nombre_region ENUM('Oaxaca', 'Chiapas', 'Michoacan', 'Puebla'),
estatus BOOLEAN DEFAULT TRUE
);

-- Tabla Pedidos--
CREATE TABLE Venta_pedidos (
id_pedido INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
id_usuario INT NOT NULL,
fecha_pedido DATETIME NOT NULL,
total_venta DECIMAL(10,2) NOT NULL,
estatus BOOLEAN DEFAULT TRUE,
FOREIGN KEY(id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabla detalle pedido
CREATE TABLE detalle_pedido (
id_detalle INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
id_pedido INT,
id_producto INT, 
cantidad_piezas INT NOT NULL,
importe_total DECIMAL(10,2) NOT NULL,
FOREIGN KEY(id_pedido) REFERENCES Venta_pedidos(id_pedido),
FOREIGN KEY(id_producto) REFERENCES Productos(id_producto)
);

-- Insertar entradas a tabla usuarios --
INSERT INTO `Usuarios`(nombre_completo, email, contraseña_hash, telefono, activo) VALUES
('Ximena Martinez', 'ximenam@gmail.com', 'OsoPolar58', '5558763898', true),
('Jose Reyes', 'jose_reyes@gmail.com', 'Mapache33', '5578345276', true),
('Ernesto Gonzalez', 'elneto@gmail.com', 'Foxy74', '5567843564', true),
('Fernanda Juarez', 'fer_juarez@gmail.com', 'Perrito86', '5568743245', true),
('Camila De la Piedra', 'camiladlp4@gmail.com', 'Bunnybunny8', '5576898798', true);

-- Insertar entradas a tabla categorias --
INSERT INTO `Categorias`(nombre_categoria, descripcion_categoria, estatus) VALUES
('TEXTIL', 'Rebozos, sarapes y tejidos tradicionales', true),
('CERAMICA', 'Piezas de cerámica pintadas a mano', true),
('DECORACION', 'Accesorios de todo tipo 100% mexicanos', true);

-- Insertar tabla region --
INSERT INTO `Regiones`(nombre_region) VALUES
('Oaxaca'),
('Chiapas'),
('Puebla'),
('Michoacan');

-- Insertar entradas a tabla productos --
INSERT INTO `Productos`(nombre_producto, descripcion_producto, precio, imagen_url, id_categoria, id_region, stock) VALUES
('Vasija de Barro', 'Vasija De Barro Grande ( Alto 1.15) Color A Elegir Tibor Vasija Xxl Oxford. Naranja. Chocolate. Amarillo', 450.00, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f', 2, 1, 35),
('Textil Bordado', 'Textil bordado hecho de material de alta calidad, 100% tela de lino, la tela es suave y cómoda, no se arruga ni se decolora fácilmente, reutilizable.', 680.00, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f', 1, 2, 15),
('Tapete Tejido', 'Tapete tejido en telar de pedal con hilos de algodón y lana. Sus patrones geométricos y colores vibrantes reflejan la tradición textil poblana. Perfecto para dar calidez a cualquier espacio, ya sea como alfombra, colgante mural o pieza decorativa.', 890.00, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f', 3,3, 8),
('Cazuela Artesanal', 'Cazuela de barro vidriado hecha a mano en talleres michoacanos. Ideal para cocinar platillos tradicionales como moles o guisos, conserva el calor y realza los sabores. Apta para uso en estufa o como pieza decorativa de cocina.', 520.00, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f', 2, 4, 20),
('Rebozo Tradicional', 'Rebozo tejido en telar de cintura con hilos de algodón teñidos naturalmente. Su diseño clásico y textura ligera lo hacen ideal para vestir con elegancia o usar como chal. Cada pieza es un homenaje a la herencia textil oaxaqueña.', 390.00, 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f', 1, 1, 5);


-- Insertar tabla pedidos--
INSERT INTO `Venta_pedidos`(id_usuario, fecha_pedido, total_venta) VALUES
(1, '2025-11-01 10:30:00', 240.00),
(2, '2025-11-02 14:15:00', 450.00),
(3, '2025-11-03 09:45:00', 300.00),
(4, '2025-11-04 16:00:00', 180.00),
(5, '2025-11-05 11:20:00', 600.00);

-- Insertar tabla detalle pedido --
INSERT INTO `Detalle_pedido`(id_pedido, id_producto, cantidad_piezas, importe_total) VALUES
(1, 3, 4, 523.00),
(2, 2, 1, 390.00),
(3, 5, 2, 866.00),
(4, 1, 5, 445.00),
(5, 4, 3, 1091.00);

Select * from usuarios;
Select * from Categorias;
Select * from Regiones;
Select * from Productos;
Select * from Venta_pedidos;
Select * from Detalle_pedido;



