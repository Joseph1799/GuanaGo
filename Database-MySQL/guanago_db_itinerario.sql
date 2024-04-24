DROP TABLE IF EXISTS `itinerario`;
CREATE TABLE `itinerario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre_lugar` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `ciudad_destino` varchar(255) DEFAULT NULL,
  `pais_destino` varchar(255) DEFAULT NULL,
  `actividades` text,
  `destino_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_destino_id` (`destino_id`),
  CONSTRAINT `fk_destino_id` FOREIGN KEY (`destino_id`) REFERENCES `destino` (`id`)
) 
