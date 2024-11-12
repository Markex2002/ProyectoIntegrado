package org.vdm.apirestpreproyecto.Exception;

public class ImagenNotFoundException extends RuntimeException{
    public ImagenNotFoundException(Long id) {
        super("Not found Imagen with id: " + id);
    }
}