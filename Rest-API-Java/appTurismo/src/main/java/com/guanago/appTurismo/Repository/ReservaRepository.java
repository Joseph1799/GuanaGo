package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByUsuarioId(Long userId);
}
