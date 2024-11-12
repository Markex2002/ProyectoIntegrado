package org.vdm.apirestpreproyecto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vdm.apirestpreproyecto.domain.Empresa;

import java.util.List;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    public List<Empresa> findBynombreEmpresaContainingIgnoreCase(String nombre);
    public List<Empresa> findByNombreEmpresaContainingIgnoreCaseOrderByNombreEmpresaAsc(String nombre);
    public List<Empresa> findByNombreEmpresaContainingIgnoreCaseOrderByNombreEmpresaDesc(String nombre);
    public List<Empresa> findAllByOrderByNombreEmpresaAsc();
    public List<Empresa> findAllByOrderByNombreEmpresaDesc();
}