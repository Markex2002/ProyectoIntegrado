package org.vdm.apirestpreproyecto.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vdm.apirestpreproyecto.Exception.AdministradorNotFoundException;
import org.vdm.apirestpreproyecto.Exception.IdiomaNotFoundException;
import org.vdm.apirestpreproyecto.domain.Administrador;
import org.vdm.apirestpreproyecto.domain.Idioma;
import org.vdm.apirestpreproyecto.repository.AdministradorRepository;
import org.vdm.apirestpreproyecto.repository.IdiomaRepository;

import java.util.*;

@Service
public class IdiomaService {

    private final IdiomaRepository idiomaRepository;

    public IdiomaService(IdiomaRepository idiomaRepository) {
        this.idiomaRepository = idiomaRepository;
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
        this.idiomaRepository.findById(id).map(p -> {this.idiomaRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new IdiomaNotFoundException(id));
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