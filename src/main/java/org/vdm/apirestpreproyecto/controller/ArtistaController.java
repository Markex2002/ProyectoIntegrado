package org.vdm.apirestpreproyecto.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vdm.apirestpreproyecto.domain.Artista;
import org.vdm.apirestpreproyecto.dto.ArtistaDTO;
import org.vdm.apirestpreproyecto.dto.ArtistaMapper;
import org.vdm.apirestpreproyecto.service.ArtistaService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/v1/api/artistas")
public class ArtistaController {
    private final ArtistaService artistaService;

    public ArtistaController(ArtistaService artistaService) {
        this.artistaService = artistaService;
    }


    @GetMapping(value = {"","/"}, params ={"!pagina", "!tamanio", "!buscar", "!ordenar"})
    public List<Artista> all() {
        List<Artista> artistas = artistaService.all();
        List<ArtistaDTO> artistasDTOs = new ArrayList<>();

        //Contamos cuantos idiomas en total habla el artista
        for (Artista artista : artistas) {
            ArtistaDTO artistaDTO = ArtistaMapper.INSTANCE.artistaAArtistaDTO(artista);
            artistaDTO.setTotalIdiomasHablados(artistaDTO.getIdiomasHablados().size());
            artistasDTOs.add(artistaDTO);
        }

        log.info("Accediendo a todos las artistas");
        return artistas;
    }


    @GetMapping(value ={"", "/"}, params = {"!pagina", "!tamanio"})
    public List<Artista> all(@RequestParam("buscar") Optional<String> buscarOptional
            , @RequestParam("ordenar") Optional<String> ordenarOptional){

        log.info("Accediendo a todos las artistas con filtro buscar: %s y ordenar");
        buscarOptional.orElse("VOID");
        ordenarOptional.orElse("VOID");

        return this.artistaService.allByQueryFiltersStream(buscarOptional, ordenarOptional);
    }


    @GetMapping(value ={"", "/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio){

        log.info("Accediendo a todos las artistas con Paginacion");
        Map<String, Object> responseAll = this.artistaService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }




    @PostMapping({"","/"})
    public Artista newArtista(@RequestBody Artista artista) {
        return this.artistaService.save(artista);
    }

    @GetMapping("/{id}")
    public Artista one(@PathVariable("id") Long id) {
        return this.artistaService.one(id);
    }

    @PutMapping("/{id}")
    public Artista updateArtista
            (@RequestBody Artista artista,
             @PathVariable("id") Long id)
    {
        log.info("Incoming PUT request...");
        log.info("Updating artist with ID: {}", id);
        log.info("Received artist data: {}", artista);

        return this.artistaService.replace(id, artista);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteArtista(@PathVariable("id") Long id) {
        this.artistaService.delete(id);
    }
}