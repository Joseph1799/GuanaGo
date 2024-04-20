package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Evento;
import com.guanago.appTurismo.Service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("guanago/evento")
public class EventoController {

    @Autowired
    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping("/listar-eventos")
    public ResponseEntity<List<Evento>> ObtenerEventos()
    {
        List<Evento> listaEventos = eventoService.ObtenerEventos();
        return ResponseEntity.ok(listaEventos);
    }

}
