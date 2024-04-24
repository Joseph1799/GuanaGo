DROP TABLE IF EXISTS `destino_disponibilidad`;
CREATE TABLE `destino_disponibilidad` (
  `destino_id` int DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `disponible` varchar(255) NOT NULL,
  `fecha_inicio` datetime(6) NOT NULL,
  `fecha_fin` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKacm3yhqhcj2iupqyammx6i2hp` (`destino_id`),
  CONSTRAINT `FKacm3yhqhcj2iupqyammx6i2hp` FOREIGN KEY (`destino_id`) REFERENCES `destino` (`id`)
) 

