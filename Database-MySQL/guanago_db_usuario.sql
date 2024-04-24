DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `reservas_id` bigint DEFAULT NULL,
  `preferencias_id` bigint DEFAULT NULL,
  `informacion_pago_id` bigint DEFAULT NULL,
  `datos_personales_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_cuts18bc0ebglkaxd2y93sly4` (`informacion_pago_id`),
  UNIQUE KEY `UK_r4qkvi14qci5l45fy0hf05w9y` (`preferencias_id`),
  KEY `fk_reservas` (`reservas_id`),
  CONSTRAINT `fk_reservas` FOREIGN KEY (`reservas_id`) REFERENCES `reserva` (`id`),
  CONSTRAINT `FKaa97q5hn638mdvft2ug9mwtx3` FOREIGN KEY (`preferencias_id`) REFERENCES `preferencias` (`id`),
  CONSTRAINT `FKfgvkqhkcofx2f38mx5dj633ls` FOREIGN KEY (`informacion_pago_id`) REFERENCES `informacion_pago` (`id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`preferencias_id`) REFERENCES `preferencias` (`id`),
  CONSTRAINT `usuario_ibfk_4` FOREIGN KEY (`informacion_pago_id`) REFERENCES `informacion_pago` (`id`)
) 
