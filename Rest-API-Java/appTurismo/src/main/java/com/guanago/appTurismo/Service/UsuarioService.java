package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Entity.Reserva;
import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.guanago.appTurismo.Entity.Destino;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Esta clase contiene el servicio que gestiona la lógica de negocio relacionada con los usuarios.
 * Por ejemplo, incluye métodos para registrar usuarios y realizar el login.
 */

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Getter
    @Setter
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration.ms}")
    private long jwtExpirationMs;

    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String generateToken(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado: " + email);
        }

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Usuario login(String email, String contrasena) {
        // Verificar si el usuario existe y la contraseña es correcta
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null && passwordEncoder.matches(contrasena, usuario.getContrasena())) {
            return usuario;
        }
        return null;
    }

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

    public Usuario obtenerUsuarioPorEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            throw new RuntimeException("Usuario no encontrado: " + email);
        }
        return usuario;
    }

    public List<Destino> obtenerDestinosReservados(Usuario usuario) {
        List<Reserva> reservas = usuario.getReservas();
        List<Destino> destinosReservados = new ArrayList<>();
        for (Reserva reserva : reservas) {
            destinosReservados.add(reserva.getDestino());
        }
        return destinosReservados;
    }



}

