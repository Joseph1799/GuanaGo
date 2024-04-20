package com.guanago.appTurismo.Service;

import com.guanago.appTurismo.Controller.UsuarioController;
import com.guanago.appTurismo.Entity.Reserva;
import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.ReservaRepository;
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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.text.SimpleDateFormat;


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

    private BCryptPasswordEncoder passwordEncoder;
    private final ReservaRepository reservaRepository;

    public UsuarioService(ReservaRepository reservaRepository) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.reservaRepository = reservaRepository;
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

    public UsuarioController.RegistroDestinoResponse RegistrarDestino(Destino destino, Usuario usuario, Date fecha_inicio, Date fecha_fin) {
        BigDecimal precio = destino.getPrecio();
        long diffEnMilisegundos = fecha_fin.getTime() - fecha_inicio.getTime();
        long diffEnDias = TimeUnit.DAYS.convert(diffEnMilisegundos, TimeUnit.MILLISECONDS);
        BigDecimal impuestos = BigDecimal.valueOf(destino.getImpuestos()).divide(BigDecimal.valueOf(100));
        BigDecimal precioSinImpuestos = precio.multiply(BigDecimal.valueOf(diffEnDias));
        BigDecimal precioTotal = precioSinImpuestos.add(precioSinImpuestos.multiply(impuestos));
        BigDecimal precioAntesDeDescuento = precioTotal;
        if (destino.getEn_oferta() == 1) {
            BigDecimal descuento = BigDecimal.valueOf(destino.getPrecio_oferta()).divide(BigDecimal.valueOf(100));
            descuento = precioTotal.multiply(descuento);
            precioTotal = precioTotal.subtract(descuento);
        }
        Reserva reserva = new Reserva();
        reserva.setDescripcion(destino.getDest_title());
        reserva.setFecha_inicio(new Date());
        reserva.setFecha_fin(fecha_fin);
        reserva.setEstado("Activo");
        reserva.setPrecio(precioTotal);
        reserva.setUsuario(usuario);
        reserva.setDestino(destino);

        reservaRepository.save(reserva);

        UsuarioController.RegistroDestinoResponse response = new UsuarioController.RegistroDestinoResponse();
        response.setDestino(destino);
        response.setFecha_inicio(new SimpleDateFormat("yyyy-MM-dd").format(fecha_inicio));
        response.setFecha_fin(new SimpleDateFormat("yyyy-MM-dd").format(fecha_fin));
        response.setPrecioAntesDelDescuento(precioAntesDeDescuento);
        response.setPrecioTotal(precioTotal);
        return response;
    }

    public List<Destino> obtenerDestinosReservados(Usuario usuario) {
        List<Reserva> reservas = usuario.getReservas();
        List<Destino> destinosReservados = new ArrayList<>();
        for (Reserva reserva : reservas) {
            destinosReservados.add(reserva.getDestino());
        }
        return destinosReservados;
    }

    public void EditarUsuario(Usuario usuarioActualizado, Usuario usuario) {
        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        usuarioRepository.save(usuario);
    }

    public void EditarContrasena(Usuario usuarioActualizado, Usuario usuario) {
        if(!usuario.getContrasena().isBlank()){
            // Hashear la contraseña antes de guardarla
            usuario.setContrasena(BCrypt.hashpw(usuarioActualizado.getContrasena(), BCrypt.gensalt()));
        }
        usuarioRepository.save(usuario);
    }

}

