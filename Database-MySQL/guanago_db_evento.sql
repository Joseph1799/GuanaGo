DROP TABLE IF EXISTS `evento`;
CREATE TABLE `evento` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `hora` varchar(50) NOT NULL,
  `imagen` mediumtext,
  `lugar` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `coords` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

