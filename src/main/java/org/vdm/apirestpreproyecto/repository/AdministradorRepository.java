package org.vdm.apirestpreproyecto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vdm.apirestpreproyecto.domain.Administrador;
import org.vdm.apirestpreproyecto.domain.Artista;

import java.util.List;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

    public List<Administrador> findByNombreContainingIgnoreCase(String nombre);
    public List<Administrador> findByNombreContainingIgnoreCaseOrderByNombreAsc(String nombre);
    public List<Administrador> findByNombreContainingIgnoreCaseOrderByNombreDesc(String nombre);
    //En este caso vamos a ordenar por nivel de privilegios
    public List<Administrador> findAllByOrderByPrivilegeLevelAsc();
    public List<Administrador> findAllByOrderByPrivilegeLevelDesc();
}