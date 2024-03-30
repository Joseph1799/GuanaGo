package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Reserva;
import com.guanago.appTurismo.Repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    public Reserva getReservaById(Long id) {
        Optional<Reserva> optionalReserva = reservaRepository.findById(id);
        return optionalReserva.orElse(null);
    }

    public List<Reserva> getReservasByUsuarioId(Long userId) {
        return reservaRepository.findByUsuarioId(userId);
    }

    public Reserva crearReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    public void borrarReserva(Long id) {
        reservaRepository.deleteById(id);
    }
}
