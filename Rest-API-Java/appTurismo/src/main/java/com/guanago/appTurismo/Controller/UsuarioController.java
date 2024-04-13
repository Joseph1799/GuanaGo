package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Destino;
import com.guanago.appTurismo.Entity.Usuario;
import com.guanago.appTurismo.Repository.UsuarioRepository;
import com.guanago.appTurismo.Service.DestinoService;
import com.guanago.appTurismo.Service.UsuarioService;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

/**
 * Esta clase contiene el controlador REST que maneja las solicitudes relacionadas con los usuarios.
 * Incluye endpoints para realizar el login y registrar usuarios.
 */

@RestController
@RequestMapping("/guanago/usuarios")
public class UsuarioController {
    private final DestinoService destinoService;
    @Autowired
    private UsuarioService usuarioService;

    public UsuarioController(DestinoService destinoService, UsuarioService usuarioService) {
        this.destinoService = destinoService;
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

    @PostMapping("registrar-destino/{idDestino}/{fecha_inicio}/{fecha_fin}")
    public RegistroDestinoResponse RegistrarDestino(@PathVariable("idDestino") int idDestino,
                                 @PathVariable("fecha_inicio") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha_inicio,
                                 @PathVariable("fecha_fin") @DateTimeFormat(pattern = "yyyy-MM-dd") Date fecha_fin,
                                 @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = Jwts.parser().setSigningKey(usuarioService.getJwtSecret()).parseClaimsJws(token).getBody().getSubject();
        Usuario usuario = usuarioService.obtenerUsuarioPorEmail(email);
        Destino destino = destinoService.ObtenerDestinoPorId(idDestino);
        RegistroDestinoResponse response = usuarioService.RegistrarDestino(destino, usuario, fecha_inicio, fecha_fin);
        return response;
    }

    public static class RegistroDestinoResponse{
        private Destino destino;
        private String fecha_inicio;
        private String fecha_fin;
        private BigDecimal precioAntesDelDescuento;
        private BigDecimal precioTotal;

        public Destino getDestino() {
            return destino;
        }
        public void setDestino(Destino destino) {
            this.destino = destino;
        }
        public String getFecha_inicio() {
            return fecha_inicio;
        }
        public void setFecha_inicio(String fecha_inicio) {
            this.fecha_inicio = fecha_inicio;
        }
        public String getFecha_fin() {
            return fecha_fin;
        }
        public void setFecha_fin(String fecha_fin) {
            this.fecha_fin = fecha_fin;
        }
        public BigDecimal getPrecioAntesDelDescuento() {
            return precioAntesDelDescuento;
        }
        public void setPrecioAntesDelDescuento(BigDecimal precioAntesDelDescuento) {
            this.precioAntesDelDescuento = precioAntesDelDescuento;
        }
        public BigDecimal getPrecioTotal() {
            return precioTotal;
        }
        public void setPrecioTotal(BigDecimal precioTotal) {
            this.precioTotal = precioTotal;
        }
    }



}

