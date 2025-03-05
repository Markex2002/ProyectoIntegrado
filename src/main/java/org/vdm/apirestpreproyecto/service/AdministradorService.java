package org.vdm.apirestpreproyecto.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.vdm.apirestpreproyecto.Exception.AdministradorNotFoundException;
import org.vdm.apirestpreproyecto.domain.Administrador;
import org.vdm.apirestpreproyecto.repository.AdministradorRepository;

import java.util.*;

@Service
public class AdministradorService {

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;


    public AdministradorService(AdministradorRepository administradorRepository, PasswordEncoder passwordEncoder) {
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Administrador> all() {
        return this.administradorRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {
        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("id").ascending());

        Page<Administrador> pageAll = this.administradorRepository.findAll(paginado);
        Map<String, Object> response = new HashMap<>();

        response.put("categorias", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Administrador save(Administrador administrador) {
        administrador.setPassword(passwordEncoder.encode(administrador.getPassword()));
        return this.administradorRepository.save(administrador);
    }

    public Administrador one(Long id) {
        return this.administradorRepository.findById(id)
                .orElseThrow(() -> new AdministradorNotFoundException(id));
    }

    public Administrador replace(Long id, Administrador administrador) {

        return this.administradorRepository.findById(id).map(p -> (id.equals(administrador.getId())  ?
                                                            this.administradorRepository.save(administrador) : null))
                .orElseThrow(() -> new AdministradorNotFoundException(id));
    }

    public void delete(Long id) {
        this.administradorRepository.findById(id).map(p -> {this.administradorRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new AdministradorNotFoundException(id));
    }
    //
    public List<Administrador>allByQueryFiltersStream(Optional<String> buscarOptional, Optional<String> ordenarOptional){
        List<Administrador> resultado = new ArrayList<>();

        if(buscarOptional.isPresent()){
            resultado = administradorRepository.findByNombreContainingIgnoreCase(buscarOptional.get());
        }
        if (ordenarOptional.isPresent()) {
            if (buscarOptional.isPresent() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = administradorRepository.findByNombreContainingIgnoreCaseOrderByNombreAsc(buscarOptional.get());
            } else if (buscarOptional.isPresent() && "desc".equalsIgnoreCase(buscarOptional.get())) {
                resultado = administradorRepository.findByNombreContainingIgnoreCaseOrderByNombreDesc(buscarOptional.get());
            } else if (buscarOptional.isEmpty() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = administradorRepository.findAllByOrderByPrivilegeLevelAsc();
            } else if (buscarOptional.isEmpty() && "desc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = administradorRepository.findAllByOrderByPrivilegeLevelDesc();
            }
        }

        return resultado;
    }
}