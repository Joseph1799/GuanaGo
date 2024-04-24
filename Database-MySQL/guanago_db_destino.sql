DROP TABLE IF EXISTS `destino`;
CREATE TABLE `destino` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen_dest` mediumtext,
  `dest_title` varchar(255) NOT NULL,
  `lugar` varchar(255) NOT NULL,
  `clasificacion` varchar(255) DEFAULT NULL,
  `impuestos` int DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `en_oferta` int NOT NULL,
  `precio_oferta` int DEFAULT NULL,
  `coords` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 



