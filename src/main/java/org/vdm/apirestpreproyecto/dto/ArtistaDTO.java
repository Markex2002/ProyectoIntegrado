package org.vdm.apirestpreproyecto.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.vdm.apirestpreproyecto.domain.Idioma;
import org.vdm.apirestpreproyecto.domain.Imagen;
import org.vdm.apirestpreproyecto.domain.OfertaTrabajo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
public class ArtistaDTO {
    //ATRIBUTOS DE ARTISTA
    private long id_artista;
    private String nombre;
    private int yearsOfExperience;
    private List<Imagen> portfolio;
    private List<Idioma> idiomasHablados;
    Set<OfertaTrabajo> ofertasTrabajos = new HashSet<>();

    //NUEVOS ATRIBUTOS
    private int totalIdiomasHablados;
}