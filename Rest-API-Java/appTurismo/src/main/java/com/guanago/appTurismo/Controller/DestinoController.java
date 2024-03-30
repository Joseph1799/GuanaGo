package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Service.DestinoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/destinos")
public class DestinoController {
    @Autowired
    private DestinoService destinoService;

    @GetMapping("/")
    public List<Destino> getAllDestinos() {
        return destinoService.getAllDestinos();
    }

    @GetMapping("/{id}")
    public Destino getDestinoById(@PathVariable Long id) {
        return destinoService.getDestinoById(id);
    }

    @PostMapping("/")
    public Destino crearDestino(@RequestBody Destino destino) {
        return destinoService.crearDestino(destino);
    }

    @PutMapping("/{id}")
    public Destino actualizarDestino(@PathVariable Long id, @RequestBody Destino destino) {
        return destinoService.actualizarDestino(id, destino);
    }

    @DeleteMapping("/{id}")
    public void borrarDestino(@PathVariable Long id) {
        destinoService.borrarDestino(id);
    }
}
