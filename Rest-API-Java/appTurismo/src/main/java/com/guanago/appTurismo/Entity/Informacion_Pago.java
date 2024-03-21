package com.guanago.appTurismo.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "informacion_Pago")
public class Informacion_Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String tipo_tarjeta;
    @Column(nullable = false)
    private String numero_tarjeta;
    @Column(nullable = false)
    private String nombre_tarjeta;
    @Column(nullable = false)
    private String fecha_vencimiento;
    @Column(nullable = false)
    private String codigo_seguridad;
    @Column(nullable = false)
    private String direccion_facturacion;
    @Column(nullable = false)
    private String ciudad_facturacion;
    @Column(nullable = false)
    private String pais_facturacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo_tarjeta() {
        return tipo_tarjeta;
    }

    public void setTipo_tarjeta(String tipo_tarjeta) {
        this.tipo_tarjeta = tipo_tarjeta;
    }

    public String getNumero_tarjeta() {
        return numero_tarjeta;
    }

    public void setNumero_tarjeta(String numero_tarjeta) {
        this.numero_tarjeta = numero_tarjeta;
    }

    public String getNombre_tarjeta() {
        return nombre_tarjeta;
    }

    public void setNombre_tarjeta(String nombre_tarjeta) {
        this.nombre_tarjeta = nombre_tarjeta;
    }

    public String getFecha_vencimiento() {
        return fecha_vencimiento;
    }

    public void setFecha_vencimiento(String fecha_vencimiento) {
        this.fecha_vencimiento = fecha_vencimiento;
    }

    public String getCodigo_seguridad() {
        return codigo_seguridad;
    }

    public void setCodigo_seguridad(String codigo_seguridad) {
        this.codigo_seguridad = codigo_seguridad;
    }

    public String getDireccion_facturacion() {
        return direccion_facturacion;
    }

    public void setDireccion_facturacion(String direccion_facturacion) {
        this.direccion_facturacion = direccion_facturacion;
    }

    public String getCiudad_facturacion() {
        return ciudad_facturacion;
    }

    public void setCiudad_facturacion(String ciudad_facturacion) {
        this.ciudad_facturacion = ciudad_facturacion;
    }

    public String getPais_facturacion() {
        return pais_facturacion;
    }

    public void setPais_facturacion(String pais_facturacion) {
        this.pais_facturacion = pais_facturacion;
    }
}
