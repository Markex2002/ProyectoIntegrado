package org.vdm.apirestpreproyecto.Exception;

public class UsuarioNotFoundException extends RuntimeException{
    public UsuarioNotFoundException(Long id) {
        super("Not found Usuario with id: " + id);
    }
}
