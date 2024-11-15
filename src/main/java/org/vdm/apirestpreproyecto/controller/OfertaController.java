package org.vdm.apirestpreproyecto.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vdm.apirestpreproyecto.domain.OfertaTrabajo;
import org.vdm.apirestpreproyecto.service.OfertaService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1/api/ofertas")
public class OfertaController {
    private final OfertaService ofertaService;

    public OfertaController(OfertaService ofertaService) {
        this.ofertaService = ofertaService;
    }


    @GetMapping(value = {"","/"}, params ={"!pagina", "!tamanio", "!buscar", "!ordenar"})
    public List<OfertaTrabajo> all() {
        log.info("Accediendo a todas las ofertas");
        return ofertaService.all();
    }


    @GetMapping(value ={"", "/"}, params = {"!pagina", "!tamanio"})
    public List<OfertaTrabajo> all(@RequestParam("buscar") Optional<String> buscarOptional
            , @RequestParam("ordenar") Optional<String> ordenarOptional){

        log.info("Accediendo a todos las artistas con filtro buscar: %s y ordenar");
        buscarOptional.orElse("VOID");
        ordenarOptional.orElse("VOID");

        return this.ofertaService.allByQueryFiltersStream(buscarOptional, ordenarOptional);
    }


    @GetMapping(value ={"", "/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio){

        log.info("Accediendo a todos los Administradores con Paginacion");
        Map<String, Object> responseAll = this.ofertaService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }


    @PostMapping({"","/"})
    public OfertaTrabajo newOferta(@RequestBody OfertaTrabajo ofertaTrabajo) {
        return this.ofertaService.save(ofertaTrabajo);
    }

    @GetMapping("/{id}")
    public OfertaTrabajo one(@PathVariable("id") Long id) {
        return this.ofertaService.one(id);
    }

    @PutMapping("/{id}")
    public OfertaTrabajo replaceOferta(@PathVariable("id") Long id, @RequestBody OfertaTrabajo ofertaTrabajo) {
        return this.ofertaService.replace(id, ofertaTrabajo);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteOferta(@PathVariable("id") Long id) {
        this.ofertaService.delete(id);
    }
}