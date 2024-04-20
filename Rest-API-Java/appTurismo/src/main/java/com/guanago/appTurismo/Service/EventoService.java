package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Evento;
import com.guanago.appTurismo.Repository.EventoRepository;
import com.guanago.appTurismo.Repository.EventoUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    @Autowired
    private final EventoRepository eventoRepository;
    @Autowired
    private EventoUsuarioRepository eventoUsuarioRepository;

    public EventoService(EventoRepository eventoRepository, EventoUsuarioRepository eventoUsuarioRepository) {
        this.eventoRepository = eventoRepository;
        this.eventoUsuarioRepository = eventoUsuarioRepository;
    }

    public List<Evento> ObtenerEventos() {
        return eventoRepository.findAll();
    }
}
