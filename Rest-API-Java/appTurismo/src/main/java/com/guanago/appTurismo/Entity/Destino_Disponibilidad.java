package com.guanago.appTurismo.Entity;

import jakarta.persistence.*;


@Entity
@Table(name = "destino_Disponibilidad")
public class Destino_Disponibilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "destino_id")
    private Long destinoId;

    @Column(nullable = false)
    private String fecha_inicio;

    @Column(nullable = false)
    private String fecha_fin;

    @Column(nullable = false)
    private String disponible;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDestinoId() {
        return destinoId;
    }

    public void setDestinoId(Long destinoId) {
        this.destinoId = destinoId;
    }

    public String getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(String fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public String getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(String fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public String getDisponible() {
        return disponible;
    }

    public void setDisponible(String disponible) {
        this.disponible = disponible;
    }
}
