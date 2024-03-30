package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.UsuarioRepository;
import com.guanago.appTurismo.Service.UsuarioService;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Esta clase contiene el controlador REST que maneja las solicitudes relacionadas con los usuarios.
 * Incluye endpoints para realizar el login y registrar usuarios.
 */

@RestController
@RequestMapping("/guanago/usuarios")
public class UsuarioController {
    @Autowired
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String contrasena = loginRequest.get("contrasena");

        Usuario usuario = usuarioService.login(email, contrasena);
        if (usuario != null) {
            String token = usuarioService.generateToken(email);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("message", "Credenciales inválidas"));
        }
    }

    @PostMapping("/registrar") // Endpoint para registrar un nuevo usuario
    public Usuario registrar(@RequestBody Usuario usuario) {
        // Llamar al método registrarUsuario del servicio para guardar el nuevo usuario en la base de datos
        return usuarioService.registrarUsuario(usuario);
    }

    @GetMapping("/destinos-reservados")
    public ResponseEntity<List<Destino>> obtenerDestinosReservados(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = Jwts.parser().setSigningKey(usuarioService.getJwtSecret()).parseClaimsJws(token).getBody().getSubject();
        Usuario usuario = usuarioService.obtenerUsuarioPorEmail(email);

        List<Destino> destinosReservados = usuarioService.obtenerDestinosReservados(usuario);

        return ResponseEntity.ok(destinosReservados);
    }

}

