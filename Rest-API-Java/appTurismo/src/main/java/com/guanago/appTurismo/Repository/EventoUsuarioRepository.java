package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.EventoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoUsuarioRepository extends JpaRepository<EventoUsuario, Long> {
}
