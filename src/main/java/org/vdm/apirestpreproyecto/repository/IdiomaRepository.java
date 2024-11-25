package org.vdm.apirestpreproyecto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vdm.apirestpreproyecto.domain.Idioma;

import java.util.List;

@Repository
public interface IdiomaRepository extends JpaRepository<Idioma, Long> {
    //BUSCAMOS POR NOMBRE
    public List<Idioma> findByNombreContainingIgnoreCase(String nombre);
    public List<Idioma> findByNombreContainingIgnoreCaseOrderByNombreAsc(String nombre);
    public List<Idioma> findByNombreContainingIgnoreCaseOrderByNombreDesc(String nombre);
    public List<Idioma> findAllByOrderByNombreAsc();
    public List<Idioma> findAllByOrderByNombreDesc();
}