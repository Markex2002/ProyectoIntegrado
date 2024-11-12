package org.vdm.apirestpreproyecto.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@DiscriminatorValue("Empresa")

@EqualsAndHashCode(callSuper = true)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Empresa extends Usuario {
    private String nombreEmpresa;
    private int numTlf;
    private String nombreRepresentante;

    @Builder
    public Empresa(long id, String username, String password, String email, String nombreEmpresa, int numTlf, String nombreRepresentante, List<OfertaTrabajo> listadoOfertas) {
        super(id, username, password, email);
        this.nombreEmpresa = nombreEmpresa;
        this.numTlf = numTlf;
        this.nombreRepresentante = nombreRepresentante;
        this.listadoOfertas = listadoOfertas;
    }

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "empresa")
    @JsonIgnore
    @ToString.Exclude
    private List<OfertaTrabajo> listadoOfertas;
}