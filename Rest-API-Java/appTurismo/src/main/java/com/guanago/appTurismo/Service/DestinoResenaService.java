package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.DestinoResena;
import com.guanago.appTurismo.Repository.DestinoResenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DestinoResenaService {

    @Autowired
    private final DestinoResenaRepository destinoResenaRepository;

    public DestinoResenaService(DestinoResenaRepository destinoReservaRepository) {
        this.destinoResenaRepository = destinoReservaRepository;
    }

    public List<DestinoResena> obtenerResenasDeDestino(int destino_id){
        List<DestinoResena> destinoResenas = destinoResenaRepository.getByDestinoId(destino_id);
        for (DestinoResena destinoResena : destinoResenas) {
            destinoResena.setDestino(null);
        }
        return destinoResenas;
    }

    public void crearResena(DestinoResena destinoResena) {
        destinoResenaRepository.save(destinoResena);
    }

}
