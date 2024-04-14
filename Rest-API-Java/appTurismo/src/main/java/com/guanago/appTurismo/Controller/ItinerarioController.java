package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Itinerario;
import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Service.ItinerarioService;
import com.guanago.appTurismo.Service.UsuarioService;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("guanago/itinerarios")
public class ItinerarioController {

    private final UsuarioService usuarioService;
    @Autowired
    private ItinerarioService itinerarioService;

    public ItinerarioController(ItinerarioService itinerarioService, UsuarioService usuarioService, UsuarioService usuarioService1) {
        this.itinerarioService = itinerarioService;
        this.usuarioService = usuarioService1;
    }

    @PostMapping("/crear-itinerario")
    public Itinerario CrearItinerario(@RequestBody Itinerario itinerario,
                                      @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = Jwts.parser().setSigningKey(usuarioService.getJwtSecret()).parseClaimsJws(token).getBody().getSubject();
        Usuario usuario = usuarioService.obtenerUsuarioPorEmail(email);
        return itinerarioService.crearItinerario(itinerario, usuario);
    };

    @GetMapping("/obtener-itinerarios")
    public ResponseEntity<List<Itinerario>> ItinerariosDeUusario(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = Jwts.parser().setSigningKey(usuarioService.getJwtSecret()).parseClaimsJws(token).getBody().getSubject();
        Usuario usuario = usuarioService.obtenerUsuarioPorEmail(email);
        return ResponseEntity.ok(itinerarioService.ItinerariosDeUsuario(usuario));
    }
}
