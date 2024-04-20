package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Entity.DestinoResena;
import com.guanago.appTurismo.Repository.DestinoRepository;
import com.guanago.appTurismo.Repository.DestinoResenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class DestinoService {
    @Autowired
    private DestinoRepository destinoRepository;
    @Autowired
    private DestinoResenaService destinoResenaService;

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

    public List<Destino> DestinosDisponiblesFiltrados(String lugar, Date fechaInicio, Date fechaFin, BigDecimal precio) {
        long diffEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
        long diffEnDias = TimeUnit.DAYS.convert(diffEnMilisegundos, TimeUnit.MILLISECONDS);
        List<Destino> destinos = destinoRepository.DestinosDisponiblesFiltrados(lugar, fechaInicio, fechaFin, precio, diffEnDias);
        List<DestinoResena> resenas = new ArrayList<>();
        for (Destino destino : destinos) {
            BigDecimal precioMultiplicado = destino.getPrecio().multiply(BigDecimal.valueOf(diffEnDias));
            destino.setPrecio(precioMultiplicado);
        }
        return destinos;
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
