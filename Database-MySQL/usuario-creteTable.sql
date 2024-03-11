CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    reservas_id BIGINT,
    preferencias_id BIGINT,
    datos_personales_id BIGINT,
    itinerario_id BIGINT,
    informacion_pago_id BIGINT,
    FOREIGN KEY (reservas_id) REFERENCES reservas(id),
    FOREIGN KEY (preferencias_id) REFERENCES preferencias(id),
    FOREIGN KEY (datos_personales_id) REFERENCES datos_personales(id),
    FOREIGN KEY (itinerario_id) REFERENCES itinerarios(id),
    FOREIGN KEY (informacion_pago_id) REFERENCES informacion_pago(id)
);
