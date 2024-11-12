package org.vdm.apirestpreproyecto.domain;

import jakarta.persistence.*;
import lombok.*;




@Entity
@DiscriminatorValue("Administrador")

@EqualsAndHashCode(callSuper = true)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Administrador extends Usuario {
    private String nombre;
    private int privilegeLevel;

    @Builder
    public Administrador(long id, String username, String password, String email, String nombre, int privilegeLevel) {
        super(id, username, password, email);
        this.nombre = nombre;
        this.privilegeLevel = privilegeLevel;
    }
}