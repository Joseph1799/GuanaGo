package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Service.DestinoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/guanago/destinos")
public class DestinoController {
    @Autowired
    private DestinoService destinoService;

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

}
