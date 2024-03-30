package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Repository.DestinoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DestinoService {
    @Autowired
    private DestinoRepository destinoRepository;

    public List<Destino> getAllDestinos() {
        return destinoRepository.findAll();
    }

    public Destino getDestinoById(Long id) {
        Optional<Destino> optionalDestino = destinoRepository.findById(id);
        return optionalDestino.orElse(null);
    }

    public Destino crearDestino(Destino destino) {
        return destinoRepository.save(destino);
    }

    public Destino actualizarDestino(Long id, Destino destino) {
        Optional<Destino> optionalDestino = destinoRepository.findById(id);
        if (optionalDestino.isPresent()) {
            Destino existingDestino = optionalDestino.get();
            existingDestino.setImagen_dest(destino.getImagen_dest());
            existingDestino.setDest_title(destino.getDest_title());
            existingDestino.setLugar(destino.getLugar());
            existingDestino.setClasificacion(destino.getClasificacion());
            existingDestino.setImpuestos(destino.getImpuestos());
            existingDestino.setDescripcion(destino.getDescripcion());
            existingDestino.setEn_oferta(destino.getEn_oferta());
            existingDestino.setPrecio(destino.getPrecio());
            existingDestino.setPrecio_oferta(destino.getPrecio_oferta());
            // Set other fields as needed
            return destinoRepository.save(existingDestino);
        } else {
            return null;
        }
    }

    public void borrarDestino(Long id) {
        destinoRepository.deleteById(id);
    }
}
