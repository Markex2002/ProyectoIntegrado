package org.vdm.apirestpreproyecto.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="tipo_usuario",
        discriminatorType = DiscriminatorType.STRING)

@EqualsAndHashCode(onlyExplicitlyIncluded = true)

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private long id;

    @NotBlank(message = "{usuario.error.username")
    @Size(max = 20, message = "{usuario.error.username.size.max")
    private String username;
    @NotBlank(message = "{usuario.error.password")
    @Size(max = 30, min = 6, message = "{usuario.error.password.size.max}")
    private String password;
    @NotBlank
    @Email(
            message = "{cliente.error.correo",
            regexp = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,5}"
    )
    private String email;
}