package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Itinerario;
import com.guanago.appTurismo.Repository.ItinerarioRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ItinerarioService {
    @Autowired
    private ItinerarioRepository itinerarioRepository;

    public List<Itinerario> getAllItinerarios() {
        return itinerarioRepository.findAll();
    }

    public Itinerario getItinerarioById(Long id) {
        Optional<Itinerario> optionalItinerario = itinerarioRepository.findById(id);
        return optionalItinerario.orElse(null);
    }

    public Itinerario crearItinerario(Itinerario itinerario) {
        return itinerarioRepository.save(itinerario);
    }

    public Itinerario actualizarItinerario(Long id, Itinerario itinerario) {
        try {
            Optional<Itinerario> optionalItinerario = itinerarioRepository.findById(id);
            if (optionalItinerario.isPresent()) {
                Itinerario existingItinerario = optionalItinerario.get();

                // Validar los datos antes de actualizar
                if (itinerario.getDescripcion() != null && !itinerario.getDescripcion().isEmpty()) {
                    existingItinerario.setDescripcion(itinerario.getDescripcion());
                } else {
                    throw new IllegalArgumentException("La descripción del itinerario es obligatoria.");
                }

                // Set other fields as needed

                return itinerarioRepository.save(existingItinerario);
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el itinerario con ID: " + id);
            }
        } catch (Exception e) {
            // Manejar la excepción de manera adecuada
            throw new ServiceException("Error al actualizar el itinerario: " + e.getMessage());
        }
    }

    public void borrarItinerario(Long id) {
        itinerarioRepository.deleteById(id);
    }
}
