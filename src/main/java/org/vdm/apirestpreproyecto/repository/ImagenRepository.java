package org.vdm.apirestpreproyecto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vdm.apirestpreproyecto.domain.Artista;
import org.vdm.apirestpreproyecto.domain.Imagen;

import java.util.List;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {

    public List<Imagen> findByNombreContainingIgnoreCase(String nombre);
    public List<Imagen> findByNombreContainingIgnoreCaseOrderByNombreAsc(String nombre);
    public List<Imagen> findByNombreContainingIgnoreCaseOrderByNombreDesc(String nombre);
    public List<Imagen> findAllByOrderByNombreAsc();
    public List<Imagen> findAllByOrderByNombreDesc();
}