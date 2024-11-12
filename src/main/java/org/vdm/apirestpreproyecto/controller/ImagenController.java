package org.vdm.apirestpreproyecto.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vdm.apirestpreproyecto.domain.Imagen;
import org.vdm.apirestpreproyecto.service.ImagenService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/v1/api/imagenes")
public class ImagenController {
    private final ImagenService imagenService;

    public ImagenController(ImagenService imagenService) {
        this.imagenService = imagenService;
    }


    @GetMapping(value = {"","/"}, params ={"!pagina", "!tamanio", "!buscar", "!ordenar"})
    public List<Imagen> all() {
        log.info("Accediendo a todos las artistas");
        return imagenService.all();
    }


    @GetMapping(value ={"", "/"}, params = {"!pagina", "!tamanio"})
    public List<Imagen> all(@RequestParam("buscar") Optional<String> buscarOptional
            , @RequestParam("ordenar") Optional<String> ordenarOptional){

        log.info("Accediendo a todos las artistas con filtro buscar: %s y ordenar");
        buscarOptional.orElse("VOID");
        ordenarOptional.orElse("VOID");

        return this.imagenService.allByQueryFiltersStream(buscarOptional, ordenarOptional);
    }


    @GetMapping(value ={"", "/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio){

        log.info("Accediendo a todos los Administradores con Paginacion");
        Map<String, Object> responseAll = this.imagenService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }


    @PostMapping({"","/"})
    public Imagen newImagen(@RequestBody Imagen imagen) {
        return this.imagenService.save(imagen);
    }

    @GetMapping("/{id}")
    public Imagen one(@PathVariable("id") Long id) {
        return this.imagenService.one(id);
    }

    @PutMapping("/{id}")
    public Imagen replaceImagen(@PathVariable("id") Long id, @RequestBody Imagen imagen) {
        return this.imagenService.replace(id, imagen);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteImagen(@PathVariable("id") Long id) {
        this.imagenService.delete(id);
    }
}