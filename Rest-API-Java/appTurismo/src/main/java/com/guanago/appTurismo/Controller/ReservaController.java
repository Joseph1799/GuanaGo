package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Reserva;
import com.guanago.appTurismo.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guanago/reservas")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        Reserva reserva = reservaService.getReservaById(id);
        if (reserva != null) {
            return ResponseEntity.ok(reserva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<Reserva>> getReservasByUsuarioId(@PathVariable Long userId) {
        List<Reserva> reservas = reservaService.getReservasByUsuarioId(userId);
        return ResponseEntity.ok(reservas);
    }

    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestBody Reserva reserva) {
        Reserva nuevaReserva = reservaService.crearReserva(reserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaReserva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reserva> actualizarReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        Reserva updatedReserva = reservaService.actualizarReserva(id, reserva);
        if (updatedReserva != null) {
            return ResponseEntity.ok(updatedReserva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrarReserva(@PathVariable Long id) {
        reservaService.borrarReserva(id);
        return ResponseEntity.noContent().build();
    }
}
