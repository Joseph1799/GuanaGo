package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.DestinoResena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DestinoResenaRepository extends JpaRepository<DestinoResena, Long> {

    @Query("SELECT dr FROM DestinoResena dr WHERE dr.destino.id = :destino_id")
    List<DestinoResena> getByDestinoId(int destino_id);

}
