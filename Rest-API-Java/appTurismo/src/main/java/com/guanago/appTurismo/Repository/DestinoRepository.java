package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.Destino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Repository
public interface DestinoRepository extends JpaRepository<Destino, Long> {

    @Query("SELECT d FROM Destino d " +
            "WHERE d.id NOT IN " +
            "(SELECT dd.destino.id FROM DestinoDisponibilidad dd " +
            "WHERE (dd.fecha_inicio <= :fechaFin AND dd.fecha_fin >= :fechaInicio) OR " +
            "(dd.fecha_inicio BETWEEN :fechaInicio AND :fechaFin OR dd.fecha_fin BETWEEN :fechaInicio AND :fechaFin))")
    List<Destino> DestinosDisponiblesEnIntervalo(@Param("fechaInicio") Date fechaInicio, @Param("fechaFin") Date fechaFin);

    @Query("SELECT d FROM Destino d " +
            "WHERE d.id NOT IN " +
            "(SELECT dd.destino.id FROM DestinoDisponibilidad dd " +
            "WHERE (dd.fecha_inicio <= :fechaFin AND dd.fecha_fin >= :fechaInicio) OR " +
            "(dd.fecha_inicio BETWEEN :fechaInicio AND :fechaFin OR dd.fecha_fin BETWEEN :fechaInicio AND :fechaFin)) " +
            "AND d.lugar LIKE %:lugar% " +
            "AND d.precio <= :precio / :dias")
    List<Destino> DestinosDisponiblesFiltrados(@Param("lugar") String lugar, @Param("fechaInicio") Date fechaInicio, @Param("fechaFin") Date fechaFin, @Param("precio") BigDecimal precio, @Param("dias") long dias);

}
