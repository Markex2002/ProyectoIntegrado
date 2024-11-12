package org.vdm.apirestpreproyecto.Exception;

public class ArtistaNotFoundException extends RuntimeException{
    public ArtistaNotFoundException(Long id) {
        super("Not found Artista with id: " + id);
    }
}
