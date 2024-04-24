DROP TABLE IF EXISTS `destino_resenas`;
CREATE TABLE `destino_resenas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destino_id` int DEFAULT NULL,
  `resena` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_der_des` (`destino_id`),
  CONSTRAINT `fk_der_des` FOREIGN KEY (`destino_id`) REFERENCES `destino` (`id`)
) 


