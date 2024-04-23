package com.guanago.appTurismo.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "destino")
public class Destino {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String imagen_dest;

    @Column(nullable = false)
    private String dest_title;

    @Column(nullable = false)
    private String lugar;

    @Column
    private String clasificacion;

    @Column
    private int impuestos;

    @Column
    private String descripcion;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column
    private int en_oferta;

    @Column
    private int precio_oferta;

    @Column
    private String coords;

    // Getters y Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagen_dest() {
        return imagen_dest;
    }

    public void setImagen_dest(String imagen_dest) {
        this.imagen_dest = imagen_dest;
    }

    public String getDest_title() {
        return dest_title;
    }

    public void setDest_title(String dest_title) {
        this.dest_title = dest_title;
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

    public int getImpuestos() {
        return impuestos;
    }

    public void setImpuestos(int impuestos) {
        this.impuestos = impuestos;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getEn_oferta() {
        return en_oferta;
    }

    public void setEn_oferta(int en_oferta) {
        this.en_oferta = en_oferta;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public int getPrecio_oferta() {
        return precio_oferta;
    }

    public void setPrecio_oferta(int precio_oferta) {
        this.precio_oferta = precio_oferta;
    }

    public String getCoords() {
        return coords;
    }

    public void setCoords(String coords) {
        this.coords = coords;
    }
}