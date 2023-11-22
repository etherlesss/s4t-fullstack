-- tablas solas
CREATE TABLE IF NOT EXISTS public.marcas (
	id_marca integer not null,
	nombre varchar(20),
	CONSTRAINT marcas_pk PRIMARY KEY (id_marca)
);

CREATE TABLE IF NOT EXISTS public.categorias (
	id_categoria integer not null,
	nombre varchar(20) not null,
	CONSTRAINT categorias_pk PRIMARY KEY (id_categoria)
);

CREATE TABLE IF NOT EXISTS public.regiones (
	id_region integer not null,
	nombre varchar(50) not null,
	CONSTRAINT regiones_pk PRIMARY KEY (id_region)
);

CREATE TABLE IF NOT EXISTS public.metodos_pago (
	id_metodo integer not null,
	nombre varchar(20) not null,
	CONSTRAINT metodos_pago_pk PRIMARY KEY (id_metodo)
);

-- tablas con referencias
CREATE TABLE IF NOT EXISTS public.ciudades (
	id_ciudad integer not null,
	nombre varchar(40) not null,
	region integer not null,
	CONSTRAINT ciudades_pk PRIMARY KEY (id_ciudad),
	CONSTRAINT ciudades_regiones_fk FOREIGN KEY (region) REFERENCES public.regiones (id_region)
);

CREATE TABLE IF NOT EXISTS public.roles (
	id_rol integer not null,
	nombre varchar(20) not null,
	CONSTRAINT roles_pk PRIMARY KEY (id_rol)
);

CREATE TABLE IF NOT EXISTS public.usuarios (
	rut varchar(10) not null,
	nombre_usuario varchar(15) not null,
	mail varchar(40) not null,
	contrasenya varchar(20) not null,
	region integer not null,
	ciudad integer not null,
	rol integer not null,
	CONSTRAINT usuarios_pk PRIMARY KEY (rut),
	CONSTRAINT usuarios_regiones_fk FOREIGN KEY (region) REFERENCES public.regiones (id_region),
	CONSTRAINT usuarios_ciudades_fk FOREIGN KEY (ciudad) REFERENCES public.ciudades (id_ciudad),
	CONSTRAINT usuarios_roles_fk FOREIGN KEY (rol) REFERENCES public.roles (id_rol)
);

CREATE TABLE IF NOT EXISTS public.productos (
	id_producto integer not null,
	nombre varchar(200) not null,
	descripcion varchar(500),
	precio integer not null,
	stock integer not null,
	imagen varchar(500),
	marca integer not null,
	categoria integer not null,
	CONSTRAINT productos_pk PRIMARY KEY (id_producto),
	CONSTRAINT productos_marcas_fk FOREIGN KEY (marca) REFERENCES public.marcas (id_marca),
	CONSTRAINT productos_categorias_fk FOREIGN KEY (categoria) REFERENCES public.categorias (id_categoria)
);

CREATE TABLE IF NOT EXISTS public.orden (
	id_orden integer not null,
	fecha date default current_timestamp,
	metodo_pago integer not null,
	usuario varchar(10) not null,
	CONSTRAINT orden_pk PRIMARY KEY (id_orden),
	CONSTRAINT orden_metodos_pago_fk FOREIGN KEY (metodo_pago) REFERENCES public.metodos_pago (id_metodo),
	CONSTRAINT orden_usuario FOREIGN KEY (usuario) REFERENCES public.usuarios (rut)
);

CREATE TABLE IF NOT EXISTS public.orden_productos (
	nro_orden integer not null,
	cod_producto integer not null,
	cantidad integer not null,
	CONSTRAINT orden_productos_pk PRIMARY KEY (nro_orden, cod_producto),
	CONSTRAINT orden_productos_fk1 FOREIGN KEY (nro_orden) REFERENCES public.orden (id_orden),
	CONSTRAINT orden_productos_fk2 FOREIGN KEY (cod_producto) REFERENCES public.productos (id_producto)
);

INSERT INTO marcas VALUES
(1, 'Logitech'),
(2, 'Razer'),
(3, 'HyperX'),
(4, 'Gear'),
(5, 'Viewsonic'),
(6, 'Samsung'),
(7, 'NZXT'),
(8, 'Seagate'),
(9, 'Gigabyte'),
(10, 'EVGA'),
(11, 'Be quiet!'),
(12, 'Spektra'),
(13, 'MSI');

INSERT INTO categorias VALUES
(1, 'Accesorios'),
(2, 'Componentes');

INSERT INTO roles VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- id, nombre
INSERT INTO regiones VALUES 
(1, 'Tarapacá'),
(2, 'Antofagasta'),
(3, 'Atacama'),
(4, 'Coquimbo'),
(5, 'Valparaíso'),
(6, 'Libertador General Bernardo OHiggins'),
(7, 'Maule'),
(8, 'Biobío'),
(9, 'La Araucanía'),
(10, 'Los Lagos'),
(11, 'Aysén del General Carlos Ibáñez del Campo'),
(12, 'Magallanes y la Antártica Chilena'),
(13, 'Metropolitana de Santiago'),
(14, 'Los Ríos'),
(15, 'Arica y Parinacota');

-- idC, nombre, idR
INSERT INTO ciudades VALUES
(1, 'Arica', 15),
(2, 'Camarones', 15),
(3, 'Putre', 15),
(4, 'Iquique', 1),
(5, 'Alto Hospicio', 1),
(6, 'Pozo Almonte', 1),
(7, 'Huara', 1),
(8, 'Pica', 1),
(9, 'Antofagasta', 2),
(10, 'Mejillones', 2),
(11, 'Sierra Gorda', 2),
(12, 'Taltal', 2),
(13, 'Copiapó', 3),
(14, 'Caldera', 3),
(15, 'Tierra Amarilla', 3),
(16, 'Chañaral', 3),
(17, 'Diego de Almagro', 3),
(18, 'Vallenar', 3),
(19, 'Alto del Carmen', 3),
(20, 'Freirina', 3),
(21, 'Huasco', 3),
(22, 'Coquimbo', 4),
(23, 'Andacollo', 4),
(24, 'La Higuera', 4),
(25, 'Paiguano', 4),
(26, 'Vicuña', 4),
(27, 'Illapel', 4),
(28, 'Canela', 4),
(29, 'Los Vilos', 4),
(30, 'Salamanca', 4),
(31, 'Ovalle', 4),
(32, 'Combarbalá', 4),
(33, 'Monte Patria', 4),
(34, 'Punitaqui', 4),
(35, 'Río Hurtado', 4),
(36, 'Valparaiso', 5),
(37, 'Casablanca', 5),
(38, 'Concón', 5),
(39, 'Juan Fernández', 5),
(40, 'Puchuncaví', 5),
(41, 'Quintero', 5),
(42, 'Viña del mar', 5);

INSERT INTO productos VALUES
(0, 'producto de prueba', null, 9990, 2, null, 1, 1),
(1, 'producto de prueba 222222', null, 9990, 2, null, 5, 2);

-- rut, nombre, mail, contraseña, region, ciudad, rol
INSERT INTO usuarios VALUES
('22888111-1', 'admin', 'admin@admin.cl', '22888111Ts', 5, 38, 1),
('14982843-3', 'user', 'usuario@test.cl', '11222333Ts', 5, 42, 2);

COMMIT;