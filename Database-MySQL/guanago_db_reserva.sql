DROP TABLE IF EXISTS `reserva`;
CREATE TABLE `reserva` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `usuario_id` bigint DEFAULT NULL,
  `destino_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKek242lfyfo8luumnduslmjais` (`destino_id`),
  KEY `FKiad9w96t12u3ms2ul93l97mel` (`usuario_id`),
  CONSTRAINT `fk_destino` FOREIGN KEY (`destino_id`) REFERENCES `destino` (`id`),
  CONSTRAINT `FKek242lfyfo8luumnduslmjais` FOREIGN KEY (`destino_id`) REFERENCES `destino` (`id`),
  CONSTRAINT `FKiad9w96t12u3ms2ul93l97mel` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) 
