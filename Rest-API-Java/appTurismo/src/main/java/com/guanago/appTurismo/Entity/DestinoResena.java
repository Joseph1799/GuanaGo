package com.guanago.appTurismo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "destino_resenas")
public class DestinoResena {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "destino_id")
    private Destino destino;

    @Column
    private String resena;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Destino getDestino() {
        return destino;
    }

    public void setDestino(Destino destino) {
        this.destino = destino;
    }

    public String getResena() {
        return resena;
    }

    public void setResena(String resena) {
        this.resena = resena;
    }
}
