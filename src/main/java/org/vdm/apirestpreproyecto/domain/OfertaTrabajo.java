package org.vdm.apirestpreproyecto.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity

@EqualsAndHashCode(onlyExplicitlyIncluded = true)

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OfertaTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long id_oferta;
    private String nombrePuesto;
    private int salarioBrutoMin;
    private int salarioBrutoMax;
    private int avaiablePositions;
    private int duracionJornada;

    @JsonFormat(pattern = "yyyy-MM-dd-HH:mm:ss",  shape = JsonFormat.Shape.STRING)
    private Date fechaPublicacion;
    @JsonFormat(pattern = "yyyy-MM-dd-HH:mm:ss",  shape = JsonFormat.Shape.STRING)
    private Date inscripcionHasta;

    //OneToMany en el que insertaremos una lista de idiomas
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "ofertaTrabajo")
    @JsonIgnore
    @ToString.Exclude
    private List<Idioma> idiomasRequeridos;

    //ManyToOne en el que la empresa tendra varias Ofertas
    @ManyToOne()
    @JoinColumn(name = "id_Empresa", nullable = false)
    private Empresa empresa;


    //En las ofertas de trabajo se podran contratar a un o varios artistas
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "ofertaTrabajo_artista",
            joinColumns = @JoinColumn(name = "id_oferta", referencedColumnName = "id_oferta"),
            inverseJoinColumns = @JoinColumn(name = "id_artista", referencedColumnName = "id"))
    Set<Artista> artistas = new HashSet<>();
}