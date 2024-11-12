package org.vdm.apirestpreproyecto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vdm.apirestpreproyecto.domain.Administrador;
import org.vdm.apirestpreproyecto.domain.OfertaTrabajo;

import java.util.List;

@Repository
public interface OfertaRepository extends JpaRepository<OfertaTrabajo, Long> {
    //BUSCAMOS POR SALARIO BRUTO MINIMO
    public List<OfertaTrabajo> findBySalarioBrutoMinGreaterThan(int cantidadMin);
    public List<OfertaTrabajo> findBySalarioBrutoMinGreaterThanOrderBySalarioBrutoMinAsc(int cantidadMin);
    public List<OfertaTrabajo> findBySalarioBrutoMinGreaterThanOrderBySalarioBrutoMinDesc(int cantidadMin);


    //ORDENAMOS POR FECHA PUBLICACION
    public List<OfertaTrabajo> findAllByOrderByFechaPublicacionAsc();
    public List<OfertaTrabajo> findAllByOrderByFechaPublicacionDesc();
}