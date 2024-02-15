package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.UsuarioRepository;
import com.guanago.appTurismo.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Esta clase contiene el controlador REST que maneja las solicitudes relacionadas con los usuarios.
 * Incluye endpoints para realizar el login y registrar usuarios.
 */

@RestController
@RequestMapping("/guanago/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping("/login") // Endpoint para realizar el login de un usuario
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String contrasena) {
        // Llamar al método login del servicio para verificar las credenciales del usuario
        Usuario usuario = usuarioService.login(email, contrasena);
        // Verificar si el login fue exitoso
        if (usuario != null) {
            // Si el login fue exitoso, devolver un mensaje de éxito
            return ResponseEntity.ok("Login exitoso");
        } else {
            // Si las credenciales son inválidas, devolver un mensaje de error con un código 401 (Unauthorized)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @PostMapping("/registrar") // Endpoint para registrar un nuevo usuario
    public Usuario registrar(@RequestBody Usuario usuario) {
        // Llamar al método registrarUsuario del servicio para guardar el nuevo usuario en la base de datos
        return usuarioService.registrarUsuario(usuario);
    }

}

