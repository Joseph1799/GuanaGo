package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Itinerario;
import com.guanago.appTurismo.Entity.ItinerarioUsuario;
import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.ItinerarioRepository;
import com.guanago.appTurismo.Repository.ItinerarioUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItinerarioService {

    private final ItinerarioUsuarioRepository itinerarioUsuarioRepository;
    @Autowired
    private ItinerarioRepository itinerarioRepository;

    public ItinerarioService(ItinerarioUsuarioRepository itinerarioUsuarioRepository, ItinerarioRepository itinerarioRepository) {
        this.itinerarioUsuarioRepository = itinerarioUsuarioRepository;
        this.itinerarioRepository = itinerarioRepository;
    }

    public List<Itinerario> getAllItinerarios() {
        return itinerarioRepository.findAll();
    }

    public Itinerario getItinerarioById(Long id) {
        Optional<Itinerario> optionalItinerario = itinerarioRepository.findById(id);
        return optionalItinerario.orElse(null);
    }

    public Itinerario crearItinerario(Itinerario itinerario, Usuario usuario) {
        ItinerarioUsuario itinerarioUsuario = new ItinerarioUsuario();
        itinerarioUsuario.setItinerario(itinerario);
        itinerarioUsuario.setUsuario(usuario);
        itinerarioRepository.save(itinerario);
        itinerarioUsuarioRepository.save(itinerarioUsuario);
        return itinerario;
    }

    public void borrarItinerario(Long id) {
        itinerarioRepository.deleteById(id);
    }

    public List<Itinerario> ItinerariosDeUsuario(Usuario usuario) {
        long usuario_id = usuario.getId();
        List<ItinerarioUsuario> itinerariosUsuario = itinerarioUsuarioRepository.ObtenerItinerariosDeUsuario(usuario_id);
        List<Itinerario> itinerario = new ArrayList<>();
        for (ItinerarioUsuario itinerarioUsuario : itinerariosUsuario) {
            itinerario.add(itinerarioUsuario.getItinerario());
        }
        return itinerario;
    }
}
