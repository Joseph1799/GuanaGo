package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.Itinerario;
import com.guanago.appTurismo.Entity.ItinerarioUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItinerarioRepository extends JpaRepository<Itinerario, Long> {



}
