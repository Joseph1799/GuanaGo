DROP TABLE IF EXISTS `informacion_pago`;
CREATE TABLE `informacion_pago` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo_tarjeta` varchar(255) DEFAULT NULL,
  `numero_tarjeta` bigint DEFAULT NULL,
  `nombre_tarjeta` varchar(255) DEFAULT NULL,
  `fecha_vencimiento` datetime(6) NOT NULL,
  `codigo_seguridad` int DEFAULT NULL,
  `direccion_facturacion` varchar(255) DEFAULT NULL,
  `ciudad_facturacion` varchar(255) DEFAULT NULL,
  `pais_facturacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
