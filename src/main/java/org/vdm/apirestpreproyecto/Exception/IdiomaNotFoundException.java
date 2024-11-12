package org.vdm.apirestpreproyecto.Exception;

public class IdiomaNotFoundException extends RuntimeException{
    public IdiomaNotFoundException(Long id) {
        super("Not found Idioma with id: " + id);
    }
}