package org.vdm.apirestpreproyecto.service;


import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.vdm.apirestpreproyecto.Exception.ArtistaNotFoundException;
import org.vdm.apirestpreproyecto.Exception.EmpresaNotFoundException;
import org.vdm.apirestpreproyecto.domain.Artista;
import org.vdm.apirestpreproyecto.repository.ArtistaRepository;

import java.util.*;

@Service
public class ArtistaService {

    private static final Logger log = LoggerFactory.getLogger(ArtistaService.class);
    private final ArtistaRepository artistaRepository;
    private final PasswordEncoder passwordEncoder;


    public ArtistaService(ArtistaRepository artistaRepository, PasswordEncoder passwordEncoder) {
        this.artistaRepository = artistaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Artista> all() {
        return this.artistaRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {
        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("id").ascending());

        Page<Artista> pageAll = this.artistaRepository.findAll(paginado);
        Map<String, Object> response = new HashMap<>();

        response.put("categorias", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Artista save(Artista artista) {
        artista.setPassword(passwordEncoder.encode(artista.getPassword()));
        return this.artistaRepository.save(artista);
    }

    public Artista one(Long id) {
        return this.artistaRepository.findById(id)
                .orElseThrow(() -> new ArtistaNotFoundException(id));
    }

    @Transactional
    public Artista replace(Long id, Artista artista) {
        artista.setPassword(passwordEncoder.encode(artista.getPassword()));

        return this.artistaRepository.findById(id).map(p -> (id.equals(artista.getId())  ?
                        this.artistaRepository.save(artista) : null))
                .orElseThrow(() -> new ArtistaNotFoundException(id));
    }


    public void delete(Long id) {
        this.artistaRepository.findById(id).map(p -> {this.artistaRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new ArtistaNotFoundException(id));
    }

    public List<Artista>allByQueryFiltersStream(Optional<String> buscarOptional, Optional<String> ordenarOptional){
        List<Artista> resultado = new ArrayList<>();

        if(buscarOptional.isPresent()){
            resultado = artistaRepository.findByNombreContainingIgnoreCase(buscarOptional.get());
        }
        if (ordenarOptional.isPresent()) {
            if (buscarOptional.isPresent() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = artistaRepository.findByNombreContainingIgnoreCaseOrderByNombreAsc(buscarOptional.get());
            } else if (buscarOptional.isPresent() && "desc".equalsIgnoreCase(buscarOptional.get())) {
                resultado = artistaRepository.findByNombreContainingIgnoreCaseOrderByNombreDesc(buscarOptional.get());
            } else if (buscarOptional.isEmpty() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = artistaRepository.findAllByOrderByNombreAsc();
            } else if (buscarOptional.isEmpty() && "desc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = artistaRepository.findAllByOrderByNombreDesc();
            }
        }

        return resultado;
    }
}