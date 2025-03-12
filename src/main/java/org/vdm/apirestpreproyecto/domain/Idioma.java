package org.vdm.apirestpreproyecto.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity

@EqualsAndHashCode(onlyExplicitlyIncluded = true)

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Idioma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long id;

    private String nombre;

    @Column(name = "ultima_actualizacion")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", shape = JsonFormat.Shape.STRING)
    private Date ultimaActualizacion;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "idioma_artista",
            joinColumns = @JoinColumn(name = "id_Idioma", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id", referencedColumnName = "id"))
    Set<Artista> artistas = new HashSet<>();

    @ManyToOne()
    @JoinColumn(name = "id_oferta", nullable = false, foreignKey = @ForeignKey(name = "FK_Oferta"))
    private OfertaTrabajo ofertaTrabajo;
}
