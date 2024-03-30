package com.guanago.appTurismo.Controller;

import com.guanago.appTurismo.Entity.Reserva;
import com.guanago.appTurismo.Service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guanago/reservas")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

}
