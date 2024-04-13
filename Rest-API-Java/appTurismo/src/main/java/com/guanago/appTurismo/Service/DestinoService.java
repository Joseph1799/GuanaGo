package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Repository.DestinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DestinoService {
    @Autowired
    private DestinoRepository destinoRepository;

    public List<Destino> obtenerDestinosEnOferta() {
        List<Destino> destinos = destinoRepository.findAll();
        List<Destino> destinosOferta = new ArrayList<>();
        for (Destino destino : destinos) {
            if (Objects.equals(destino.getEn_oferta(), "1")) {
                destinosOferta.add(destino);
            }
        }
        return destinosOferta;
    }

    public List<Destino> DestinosDisponiblesEnIntervalo(Date fechaInicio, Date fechaFin) {
        return destinoRepository.DestinosDisponiblesEnIntervalo(fechaInicio, fechaFin);
    }

    public Destino ObtenerDestinoPorId(int id) {
        Optional<Destino> optionalDestino = destinoRepository.findById(Long.valueOf(id));
        if (optionalDestino.isPresent()) {
            return optionalDestino.get();
        } else {
            throw new RuntimeException("Destino no encontrado: " + id);
        }
    }


}
