package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Entity.DestinoResena;
import com.guanago.appTurismo.Entity.Evento;
import com.guanago.appTurismo.Service.DestinoResenaService;
import com.guanago.appTurismo.Service.DestinoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/guanago/destinos")
public class DestinoController {
    @Autowired
    private DestinoService destinoService;

    @Autowired
    private DestinoResenaService destinoResenaService;

    public DestinoController(DestinoService destinoService) {
        this.destinoService = destinoService;
    }

    @GetMapping("/en-oferta")
    public ResponseEntity<List<Destino>> obtenerDestinosEnOferta(HttpServletRequest request) {
        List<Destino> destinosEnOferta = destinoService.obtenerDestinosEnOferta();
        return ResponseEntity.ok(destinosEnOferta);
    }

    @GetMapping("/disponibilidad")
    public ResponseEntity<List<Destino>> obtenerDestinosDisponibles(
        @RequestParam("inicio") @DateTimeFormat(pattern = "yyyy-MM-dd")Date fechaInicio,
        @RequestParam("fin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaFin) {
        List<Destino> destinosDisponibles = destinoService.DestinosDisponiblesEnIntervalo(fechaInicio, fechaFin);
        return ResponseEntity.ok(destinosDisponibles);
    }

    @GetMapping("/buscar-destino")
    public ResponseEntity<List<Destino>> buscarDestinosFiltrados(
            @RequestParam("lugar") String lugar,
            @RequestParam("inicio") @DateTimeFormat(pattern = "yyyy-MM-dd")Date fechaInicio,
            @RequestParam("fin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fechaFin,
            @RequestParam("precio") int precio){
        List<Destino> destinosDisponibles = destinoService.DestinosDisponiblesFiltrados(lugar, fechaInicio, fechaFin, BigDecimal.valueOf(precio));
        return ResponseEntity.ok(destinosDisponibles);
    }

    @GetMapping("/resenas-destino")
    public ResponseEntity<List<DestinoResena>> ObtenerResenasDeDestino(@RequestParam("destinoId") int destinoId) {
        return ResponseEntity.ok(destinoResenaService.obtenerResenasDeDestino(destinoId));
    }

    @PostMapping("/crear-resena")
    public ResponseEntity<String> crearResena(@RequestBody DestinoResena destinoResena,
                                     @RequestParam("destino_id") int destinoId){
        destinoResena.setDestino(destinoService.ObtenerDestinoPorId(destinoId));
        destinoResenaService.crearResena(destinoResena);
        return ResponseEntity.ok("Reseña Agregada Exitosamente");
    }

    @GetMapping("/destinoById")
    public Destino ObtenerDestinoPorId(@RequestParam("destinoId") int destinoId) {
        return destinoService.ObtenerDestinoPorId(destinoId);
    }

    @GetMapping("/listar-6destinos")
    public ResponseEntity<List<Destino>> Obtener6Destinos()
    {
        List<Destino> listaDestinos = destinoService.Obtener6Destinos();
        return ResponseEntity.ok(listaDestinos);
    }
}
