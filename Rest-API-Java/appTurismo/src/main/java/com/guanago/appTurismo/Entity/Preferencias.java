package com.guanago.appTurismo.Entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "preferencias")
public class Preferencias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String idioma;

    @Column(nullable = false)
    private String moneda;

    @Column(nullable = false)
    private String tema_visual;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public String getTema_visual() {
        return tema_visual;
    }

    public void setTema_visual(String tema_visual) {
        this.tema_visual = tema_visual;
    }


}