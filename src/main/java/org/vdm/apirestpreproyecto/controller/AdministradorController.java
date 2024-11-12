package org.vdm.apirestpreproyecto.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vdm.apirestpreproyecto.domain.Administrador;
import org.vdm.apirestpreproyecto.service.AdministradorService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/v1/api/administradores")
public class AdministradorController {
    private final AdministradorService administradorService;

    public AdministradorController(AdministradorService administradorService) {
        this.administradorService = administradorService;
    }


    @GetMapping(value = {"","/"}, params ={"!pagina", "!tamanio", "!buscar", "!ordenar"})
    public List<Administrador> all() {
        log.info("Accediendo a todos las artistas");
        return administradorService.all();
    }


    @GetMapping(value ={"", "/"}, params = {"!pagina", "!tamanio"})
    public List<Administrador> all(@RequestParam("buscar") Optional<String> buscarOptional
            , @RequestParam("ordenar") Optional<String> ordenarOptional){

        log.info("Accediendo a todos las artistas con filtro buscar: %s y ordenar");
        buscarOptional.orElse("VOID");
        ordenarOptional.orElse("VOID");

        return this.administradorService.allByQueryFiltersStream(buscarOptional, ordenarOptional);
    }


    @GetMapping(value ={"", "/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio){

        log.info("Accediendo a todos los Administradores con Paginacion");
        Map<String, Object> responseAll = this.administradorService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }


    @PostMapping({"","/"})
    public Administrador newAdministrador(@RequestBody Administrador administrador) {
        return this.administradorService.save(administrador);
    }

    @GetMapping("/{id}")
    public Administrador one(@PathVariable("id") Long id) {
        return this.administradorService.one(id);
    }

    @PutMapping("/{id}")
    public Administrador replaceAdministrador(@PathVariable("id") Long id, @RequestBody Administrador administrador) {
        return this.administradorService.replace(id, administrador);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteAdministrador(@PathVariable("id") Long id) {
        this.administradorService.delete(id);
    }
}