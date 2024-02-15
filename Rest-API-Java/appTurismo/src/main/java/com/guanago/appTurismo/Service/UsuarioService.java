package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 * Esta clase contiene el servicio que gestiona la lógica de negocio relacionada con los usuarios.
 * Por ejemplo, incluye métodos para registrar usuarios y realizar el login.
 */

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario usuario) {
        // Método para registrar un nuevo usuario
        // Verificar si el usuario ya existe
        if (usuarioRepository.findByEmail(usuario.getEmail()) != null) {
            throw new RuntimeException("El usuario ya existe");
        }
        // Hashear la contraseña antes de guardarla
        usuario.setContrasena(BCrypt.hashpw(usuario.getContrasena(), BCrypt.gensalt()));
        // Guardar el nuevo usuario en la base de datos
        return usuarioRepository.save(usuario);
    }

    public Usuario login(String email, String contrasena) {
        // Método para realizar el login de un usuario
        // Buscar el usuario en la base de datos por su email
        Usuario usuario = usuarioRepository.findByEmail(email);
        // Verificar si el usuario existe y la contraseña es correcta
        if (usuario != null && BCrypt.checkpw(contrasena, usuario.getContrasena())) {
            return usuario;
        }
        return null; // Devolver null si las credenciales son inválidas
    }

}

