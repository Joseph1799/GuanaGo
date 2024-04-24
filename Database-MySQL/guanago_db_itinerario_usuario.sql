DROP TABLE IF EXISTS `itinerario_usuario`;
CREATE TABLE `itinerario_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint DEFAULT NULL,
  `itinerario_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_id` (`usuario_id`),
  KEY `fk_itinerario_id` (`itinerario_id`),
  CONSTRAINT `fk_itinerario_id` FOREIGN KEY (`itinerario_id`) REFERENCES `itinerario` (`id`),
  CONSTRAINT `fk_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) 
