package org.vdm.apirestpreproyecto.Exception;

public class AdministradorNotFoundException extends RuntimeException{
    public AdministradorNotFoundException(Long id) {
        super("Not found Administrador with id: " + id);
    }
}