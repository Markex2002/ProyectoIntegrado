package org.vdm.apirestpreproyecto.Exception;

public class OfertaNotFoundException extends RuntimeException{
    public OfertaNotFoundException(Long id) {
        super("Not found Oferta with id: " + id);
    }
}