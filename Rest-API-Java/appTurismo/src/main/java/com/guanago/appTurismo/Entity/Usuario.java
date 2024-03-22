package com.guanago.appTurismo.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

/**
 * Esta clase es la que representa a un usuario en el sistema.
 */
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String contrasena;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(name = "reservas_id")
    private Long reservasId;

    @Column(name = "preferencias_id")
    private Long preferenciasId;

    @Column(name = "itinerario_id")
    private Long itinerarioId;

    @Column(name = "informacion_pago_id")
    private Long informacionPagoId;

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Long getReservasId() {
        return reservasId;
    }

    public void setReservasId(Long reservasId) {
        this.reservasId = reservasId;
    }

    public Long getPreferenciasId() {
        return preferenciasId;
    }

    public void setPreferenciasId(Long preferenciasId) {
        this.preferenciasId = preferenciasId;
    }

    public Long getItinerarioId() {
        return itinerarioId;
    }

    public void setItinerarioId(Long itinerarioId) {
        this.itinerarioId = itinerarioId;
    }

    public Long getInformacionPagoId() {
        return informacionPagoId;
    }

    public void setInformacionPagoId(Long informacionPagoId) {
        this.informacionPagoId = informacionPagoId;
    }
}


