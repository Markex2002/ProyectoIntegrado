package org.vdm.apirestpreproyecto.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.vdm.apirestpreproyecto.Exception.EmpresaNotFoundException;
import org.vdm.apirestpreproyecto.domain.Empresa;
import org.vdm.apirestpreproyecto.repository.EmpresaRepository;

import java.util.*;

@Service
public class EmpresaService {

    private final EmpresaRepository empresaRepository;
    private final PasswordEncoder passwordEncoder;


    public EmpresaService(EmpresaRepository empresaRepository, PasswordEncoder passwordEncoder) {
        this.empresaRepository = empresaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Empresa> all() {
        return this.empresaRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {
        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("id").ascending());

        Page<Empresa> pageAll = this.empresaRepository.findAll(paginado);
        Map<String, Object> response = new HashMap<>();

        response.put("categorias", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Empresa save(Empresa empresa) {
        empresa.setPassword(passwordEncoder.encode(empresa.getPassword()));
        return this.empresaRepository.save(empresa);
    }

    public Empresa one(Long id) {
        return this.empresaRepository.findById(id)
                .orElseThrow(() -> new EmpresaNotFoundException(id));
    }

    public Empresa replace(Long id, Empresa empresa) {
        empresa.setPassword(passwordEncoder.encode(empresa.getPassword()));

        return this.empresaRepository.findById(id).map(p -> (id.equals(empresa.getId())  ?
                                                            this.empresaRepository.save(empresa) : null))
                .orElseThrow(() -> new EmpresaNotFoundException(id));
    }

    public void delete(Long id) {
        this.empresaRepository.findById(id).map(p -> {this.empresaRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EmpresaNotFoundException(id));
    }
    //
    public List<Empresa>allByQueryFiltersStream(Optional<String> buscarOptional, Optional<String> ordenarOptional){
        List<Empresa> resultado = new ArrayList<>();

        if(buscarOptional.isPresent()){
            resultado = empresaRepository.findBynombreEmpresaContainingIgnoreCase(buscarOptional.get());
        }
        if (ordenarOptional.isPresent()) {
            if (buscarOptional.isPresent() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = empresaRepository.findByNombreEmpresaContainingIgnoreCaseOrderByNombreEmpresaAsc(buscarOptional.get());
            } else if (buscarOptional.isPresent() && "desc".equalsIgnoreCase(buscarOptional.get())) {
                resultado = empresaRepository.findByNombreEmpresaContainingIgnoreCaseOrderByNombreEmpresaDesc(buscarOptional.get());
            } else if (buscarOptional.isEmpty() && "asc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = empresaRepository.findAllByOrderByNombreEmpresaAsc();
            } else if (buscarOptional.isEmpty() && "desc".equalsIgnoreCase(ordenarOptional.get())) {
                resultado = empresaRepository.findAllByOrderByNombreEmpresaDesc();
            }
        }

        return resultado;
    }
}