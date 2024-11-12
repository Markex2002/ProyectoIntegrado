package org.vdm.apirestpreproyecto.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity

@EqualsAndHashCode(onlyExplicitlyIncluded = true)

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long idImagen;
    private String url;
    private String nombre;

    @ManyToOne()
    @JoinColumn(name = "id", nullable = false)
    private Artista artista;
}