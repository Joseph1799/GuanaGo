package com.guanago.appTurismo.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "destino")
public class Destino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imagenDest;

    @Column(nullable = false)
    private String destTitle;

    @Column(nullable = false)
    private String lugar;

    @Column(nullable = false)
    private String clasificacion;

    @Column(nullable = false)
    private String impuestos;

    @Column(nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private String en_oferta;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio_oferta;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagenDest() {
        return imagenDest;
    }

    public void setImagenDest(String imagenDest) {
        this.imagenDest = imagenDest;
    }

    public String getDestTitle() {
        return destTitle;
    }

    public void setDestTitle(String destTitle) {
        this.destTitle = destTitle;
    }

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public String getClasificacion() {
        return clasificacion;
    }

    public void setClasificacion(String clasificacion) {
        this.clasificacion = clasificacion;
    }

    public String getImpuestos() {
        return impuestos;
    }

    public void setImpuestos(String impuestos) {
        this.impuestos = impuestos;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEn_oferta() {
        return en_oferta;
    }

    public void setEn_oferta(String en_oferta) {
        this.en_oferta = en_oferta;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public BigDecimal getPrecio_oferta() {
        return precio_oferta;
    }

    public void setPrecio_oferta(BigDecimal precio_oferta) {
        this.precio_oferta = precio_oferta;
    }
}