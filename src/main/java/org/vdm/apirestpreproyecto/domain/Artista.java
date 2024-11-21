package org.vdm.apirestpreproyecto.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@DiscriminatorValue("Artista")

@EqualsAndHashCode(callSuper = true)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Artista extends Usuario {
    private String nombre;
    private String descripcionCorta;
    private String descripcionLarga;
    private int yearsOfExperience;


    @Builder
    public Artista(long id, String username, String password, String email, String nombre,
                   int yearsOfExperience, List<Idioma> idiomasHablados,
                   List<Imagen> portfolio, Set<OfertaTrabajo> ofertasTrabajos) {
        super(id, username, password, email);
        this.nombre = nombre;
        this.descripcionCorta = descripcionCorta;
        this.yearsOfExperience = yearsOfExperience;
        this.idiomasHablados = idiomasHablados;
        this.portfolio = portfolio;
        this.ofertasTrabajos = ofertasTrabajos;

    }


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "artista")
    @JsonIgnore
    @ToString.Exclude
    private List<Imagen> portfolio;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "artistas")
    @JsonIgnore
    @ToString.Exclude
    private List<Idioma> idiomasHablados = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "artistas")
    @ToString.Exclude
    @JsonIgnore
    Set<OfertaTrabajo> ofertasTrabajos = new HashSet<>();
}