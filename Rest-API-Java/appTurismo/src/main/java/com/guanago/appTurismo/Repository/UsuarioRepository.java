package com.guanago.appTurismo.Repository;

import com.guanago.appTurismo.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}

