package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Itinerario;
import com.guanago.appTurismo.Entity.ItinerarioUsuario;
import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.ItinerarioRepository;
import com.guanago.appTurismo.Repository.ItinerarioUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Itinerario findById(long itinerario_id) {
        if(itinerario_id != 0) {
            Itinerario itinerario = itinerarioRepository.findById(itinerario_id);
            return itinerario;
        } else {
            throw new RuntimeException("Itinerario no encontrado: " + itinerario_id);
        }
    }

    public Itinerario EditarItinerario(Itinerario itinerario) {
        Itinerario itinerarioExistente = itinerarioRepository.findById(itinerario.getId())
        .orElseThrow(() -> new RuntimeException("Itinerario no encontrado"));

        itinerarioExistente.setNombre_lugar(itinerario.getNombre_lugar());
        itinerarioExistente.setDescripcion(itinerario.getDescripcion());
        itinerarioExistente.setFecha_inicio(itinerario.getFecha_inicio());
        itinerarioExistente.setFecha_fin(itinerario.getFecha_fin());
        itinerarioExistente.setCiudad_destino(itinerario.getCiudad_destino());
        itinerarioExistente.setPais_destino(itinerario.getPais_destino());
        itinerarioExistente.setActividades(itinerario.getActividades());
        itinerarioExistente.setDestino(itinerario.getDestino());

        return itinerarioRepository.save(itinerarioExistente);
    }
}
