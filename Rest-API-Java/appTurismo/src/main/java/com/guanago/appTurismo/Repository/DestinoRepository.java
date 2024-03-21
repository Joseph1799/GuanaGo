package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.Destino;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DestinoRepository extends JpaRepository<Destino, Long> {
    // Puedes añadir métodos personalizados aquí si necesitas realizar consultas específicas
}
