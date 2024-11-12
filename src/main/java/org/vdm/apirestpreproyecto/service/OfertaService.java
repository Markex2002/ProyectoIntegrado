package org.vdm.apirestpreproyecto.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vdm.apirestpreproyecto.Exception.ImagenNotFoundException;
import org.vdm.apirestpreproyecto.Exception.OfertaNotFoundException;
import org.vdm.apirestpreproyecto.domain.Imagen;
import org.vdm.apirestpreproyecto.domain.OfertaTrabajo;
import org.vdm.apirestpreproyecto.repository.ImagenRepository;
import org.vdm.apirestpreproyecto.repository.OfertaRepository;

import java.util.*;

@Service
public class OfertaService {

    private final OfertaRepository ofertaRepository;

    public OfertaService(OfertaRepository ofertaRepository) {
        this.ofertaRepository = ofertaRepository;
    }

    public List<OfertaTrabajo> all() {
        return this.ofertaRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {
        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("id_oferta").ascending());

        Page<OfertaTrabajo> pageAll = this.ofertaRepository.findAll(paginado);
        Map<String, Object> response = new HashMap<>();

        response.put("categorias", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public OfertaTrabajo save(OfertaTrabajo ofertaTrabajo) {
        return this.ofertaRepository.save(ofertaTrabajo);
    }

    public OfertaTrabajo one(Long id) {
        return this.ofertaRepository.findById(id)
                .orElseThrow(() -> new OfertaNotFoundException(id));
    }

    public OfertaTrabajo replace(Long id, OfertaTrabajo ofertaTrabajo) {

        return this.ofertaRepository.findById(id).map(p -> (id.equals(ofertaTrabajo.getId_oferta())  ?
                                                            this.ofertaRepository.save(ofertaTrabajo) : null))
                .orElseThrow(() -> new OfertaNotFoundException(id));
    }

    public void delete(Long id) {
        this.ofertaRepository.findById(id).map(p -> {this.ofertaRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new OfertaNotFoundException(id));
    }
    //
    public List<OfertaTrabajo>allByQueryFiltersStream(Optional<String> buscarOptional, Optional<String> ordenarOptional){
        List<OfertaTrabajo> resultado = new ArrayList<>();


        //NOS LA JUGAMOS PARSEANDO EL STRING DE BUSCAR A INTEGER
        if(buscarOptional.isPresent()){
            resultado = ofertaRepository.findBySalarioBrutoMinGreaterThan(Integer.parseInt(buscarOptional.get()));
        }
        if (ordenarOptional.isPresent()) {
            if (buscarOptional.isPresent() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = ofertaRepository.findBySalarioBrutoMinGreaterThanOrderBySalarioBrutoMinAsc(Integer.parseInt(buscarOptional.get()));
            } else if (buscarOptional.isPresent() && "desc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = ofertaRepository.findBySalarioBrutoMinGreaterThanOrderBySalarioBrutoMinDesc(Integer.parseInt(buscarOptional.get()));
            } else if (buscarOptional.isEmpty() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = ofertaRepository.findAllByOrderByFechaPublicacionAsc();
            } else if (buscarOptional.isEmpty() && "desc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = ofertaRepository.findAllByOrderByFechaPublicacionDesc();
            }
        }

        return resultado;
    }
}