package org.vdm.apirestpreproyecto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vdm.apirestpreproyecto.domain.Artista;

import java.util.List;

@Repository
public interface ArtistaRepository extends JpaRepository<Artista, Long> {

    public List<Artista> findByNombreContainingIgnoreCase(String nombre);
    public List<Artista> findByNombreContainingIgnoreCaseOrderByNombreAsc(String nombre);
    public List<Artista> findByNombreContainingIgnoreCaseOrderByNombreDesc(String nombre);
    public List<Artista> findAllByOrderByNombreAsc();
    public List<Artista> findAllByOrderByNombreDesc();
}