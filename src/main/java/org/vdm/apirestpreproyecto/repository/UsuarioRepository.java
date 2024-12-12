package org.vdm.apirestpreproyecto.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vdm.apirestpreproyecto.domain.Usuario;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    public List<Usuario> findByUsernameContainingIgnoreCase(String nombre);
    public List<Usuario> findByUsernameContainingIgnoreCaseOrderByUsernameAsc(String nombre);
    public List<Usuario> findByUsernameContainingIgnoreCaseOrderByUsernameDesc(String nombre);
    public List<Usuario> findAllByOrderByUsernameAsc();
    public List<Usuario> findAllByOrderByUsernameDesc();
}