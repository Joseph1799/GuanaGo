package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.ItinerarioUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItinerarioUsuarioRepository extends JpaRepository<ItinerarioUsuario, Long> {

    @Query("SELECT i FROM ItinerarioUsuario i WHERE i.usuario.id = :usuario_id")
    List<ItinerarioUsuario> ObtenerItinerariosDeUsuario(@Param("usuario_id") long usuario_id);


}
