DROP TABLE IF EXISTS `eventos_usuario`;
CREATE TABLE `eventos_usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint DEFAULT NULL,
  `evento_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_id2` (`usuario_id`),
  KEY `fk_evento_id` (`evento_id`),
  CONSTRAINT `fk_evento_id` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`),
  CONSTRAINT `fk_usuario_id2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`)
) 
