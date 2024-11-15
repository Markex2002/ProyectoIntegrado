package org.vdm.apirestpreproyecto.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vdm.apirestpreproyecto.domain.Idioma;
import org.vdm.apirestpreproyecto.service.IdiomaService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1/api/idiomas")
public class IdiomaController {
    private final IdiomaService idiomaService;

    public IdiomaController(IdiomaService idiomaService) {
        this.idiomaService = idiomaService;
    }


    @GetMapping(value = {"","/"}, params ={"!pagina", "!tamanio", "!buscar", "!ordenar"})
    public List<Idioma> all() {
        log.info("Accediendo a todos los idiomas");
        return idiomaService.all();
    }


    @GetMapping(value ={"", "/"}, params = {"!pagina", "!tamanio"})
    public List<Idioma> all(@RequestParam("buscar") Optional<String> buscarOptional
            , @RequestParam("ordenar") Optional<String> ordenarOptional){

        log.info("Accediendo a todos los idiomas con filtro buscar: %s y ordenar");
        buscarOptional.orElse("VOID");
        ordenarOptional.orElse("VOID");

        return this.idiomaService.allByQueryFiltersStream(buscarOptional, ordenarOptional);
    }


    @GetMapping(value ={"", "/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio){

        log.info("Accediendo a todos los Administradores con Paginacion");
        Map<String, Object> responseAll = this.idiomaService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }


    @PostMapping({"","/"})
    public Idioma newIdioma(@RequestBody Idioma idioma) {
        return this.idiomaService.save(idioma);
    }

    @GetMapping("/{id}")
    public Idioma one(@PathVariable("id") Long id) {
        return this.idiomaService.one(id);
    }

    @PutMapping("/{id}")
    public Idioma replaceIdioma(@PathVariable("id") Long id, @RequestBody Idioma idioma) {
        return this.idiomaService.replace(id, idioma);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteIdioma(@PathVariable("id") Long id) {
        this.idiomaService.delete(id);
    }
}