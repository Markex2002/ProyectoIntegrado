package org.vdm.apirestpreproyecto.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vdm.apirestpreproyecto.Exception.AdministradorNotFoundException;
import org.vdm.apirestpreproyecto.Exception.IdiomaNotFoundException;
import org.vdm.apirestpreproyecto.domain.*;
import org.vdm.apirestpreproyecto.repository.AdministradorRepository;
import org.vdm.apirestpreproyecto.repository.ArtistaRepository;
import org.vdm.apirestpreproyecto.repository.IdiomaRepository;
import org.vdm.apirestpreproyecto.repository.OfertaRepository;

import java.util.*;

@Service
public class IdiomaService {

    private final IdiomaRepository idiomaRepository;
    private final OfertaRepository ofertaRepository;
    private final ArtistaRepository artistaRepository;

    public IdiomaService(IdiomaRepository idiomaRepository, OfertaRepository ofertaRepository, ArtistaRepository artistaRepository) {
        this.idiomaRepository = idiomaRepository;
        this.ofertaRepository = ofertaRepository;
        this.artistaRepository = artistaRepository;
    }

    public List<Idioma> all() {
        return this.idiomaRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {
        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("id").ascending());

        Page<Idioma> pageAll = this.idiomaRepository.findAll(paginado);
        Map<String, Object> response = new HashMap<>();

        response.put("categorias", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Idioma save(Idioma idioma) {
        return this.idiomaRepository.save(idioma);
    }

    public Idioma one(Long id) {
        return this.idiomaRepository.findById(id)
                .orElseThrow(() -> new IdiomaNotFoundException(id));
    }

    public Idioma replace(Long id, Idioma idioma) {

        return this.idiomaRepository.findById(id).map(p -> (id.equals(idioma.getId())  ?
                                                            this.idiomaRepository.save(idioma) : null))
                .orElseThrow(() -> new IdiomaNotFoundException(id));
    }

    public void delete(Long id) {
        System.out.println("Deleting idioma with ID: " + id);

        Idioma idioma = idiomaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Oferta not found"));

        System.out.println("Idioma belongs to oferta: " + (idioma.getOfertaTrabajo() != null ? idioma.getOfertaTrabajo().getId_oferta() : "none"));
        System.out.println("Idioma belongs to " + idioma.getArtistas().size() + " artistas");



        //ANTES DE ELIMINAR EL IDIOMA HAY QUE QUITARLO DE LA OFERTA A LA QUE PERTENECE
        OfertaTrabajo ofertaTrabajo = idioma.getOfertaTrabajo();
        if (ofertaTrabajo != null) {
            ofertaTrabajo.getIdiomasRequeridos().remove(idioma);
            ofertaRepository.save(ofertaTrabajo);
        }

        //ANTES DE ELIMINAR EL IDIOMA HAY QUE QUITARLO DE LOS ARTISTAS A LA QUE PERTENEZCA
        Iterator<Artista> iterator = idioma.getArtistas().iterator();
        while (iterator.hasNext()) {
            Artista artista = iterator.next();
            iterator.remove(); // Correcto
        }

        //Eliminamos la Oferta
        idiomaRepository.delete(idioma);
    }

    //
    public List<Idioma>allByQueryFiltersStream(Optional<String> buscarOptional, Optional<String> ordenarOptional){
        List<Idioma> resultado = new ArrayList<>();

        if(buscarOptional.isPresent()){
            resultado = idiomaRepository.findByNombreContainingIgnoreCase(buscarOptional.get());
        }
        if (ordenarOptional.isPresent()) {
            if (buscarOptional.isPresent() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = idiomaRepository.findByNombreContainingIgnoreCaseOrderByNombreAsc(buscarOptional.get());
            } else if (buscarOptional.isPresent() && "desc".equalsIgnoreCase(buscarOptional.get())) {
                resultado = idiomaRepository.findByNombreContainingIgnoreCaseOrderByNombreDesc(buscarOptional.get());
            } else if (buscarOptional.isEmpty() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = idiomaRepository.findAllByOrderByNombreAsc();
            } else if (buscarOptional.isEmpty() && "desc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = idiomaRepository.findAllByOrderByNombreDesc();
            }
        }

        return resultado;
    }
}