DROP TABLE IF EXISTS `preferencias`;
CREATE TABLE `preferencias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idioma` varchar(255) DEFAULT NULL,
  `moneda` varchar(255) DEFAULT NULL,
  `tema_visual` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 
