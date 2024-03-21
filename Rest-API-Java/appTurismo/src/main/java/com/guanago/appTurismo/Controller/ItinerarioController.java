package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Itinerario;
import com.guanago.appTurismo.Service.ItinerarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itinerarios")
public class ItinerarioController {
    @Autowired
    private ItinerarioService itinerarioService;

    @GetMapping("/")
    public List<Itinerario> getAllItinerarios() {
        return itinerarioService.getAllItinerarios();
    }

    @GetMapping("/{id}")
    public Itinerario getItinerarioById(@PathVariable Long id) {
        return itinerarioService.getItinerarioById(id);
    }

    @PostMapping("/")
    public Itinerario crearItinerario(@RequestBody Itinerario itinerario) {
        return itinerarioService.crearItinerario(itinerario);
    }

    @PutMapping("/{id}")
    public Itinerario actualizarItinerario(@PathVariable Long id, @RequestBody Itinerario itinerario) {
        return itinerarioService.actualizarItinerario(id, itinerario);
    }

    @DeleteMapping("/{id}")
    public void borrarItinerario(@PathVariable Long id) {
        itinerarioService.borrarItinerario(id);
    }
}
