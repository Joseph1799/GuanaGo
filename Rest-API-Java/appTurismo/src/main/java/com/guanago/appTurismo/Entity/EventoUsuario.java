package com.guanago.appTurismo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "evento_usuario")
public class EventoUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    Evento evento;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }
}
