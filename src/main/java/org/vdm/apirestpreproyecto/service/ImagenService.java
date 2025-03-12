package org.vdm.apirestpreproyecto.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vdm.apirestpreproyecto.Exception.AdministradorNotFoundException;
import org.vdm.apirestpreproyecto.Exception.ImagenNotFoundException;
import org.vdm.apirestpreproyecto.domain.Administrador;
import org.vdm.apirestpreproyecto.domain.Artista;
import org.vdm.apirestpreproyecto.domain.Imagen;
import org.vdm.apirestpreproyecto.repository.AdministradorRepository;
import org.vdm.apirestpreproyecto.repository.ArtistaRepository;
import org.vdm.apirestpreproyecto.repository.ImagenRepository;

import java.util.*;

@Service
public class ImagenService {

    private final ImagenRepository imagenRepository;
    private final ArtistaRepository artistaRepository;

    public ImagenService(ImagenRepository imagenRepository, ArtistaRepository artistaRepository) {
        this.imagenRepository = imagenRepository;
        this.artistaRepository = artistaRepository;
    }

    public List<Imagen> all() {
        return this.imagenRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {
        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("idImagen").ascending());

        Page<Imagen> pageAll = this.imagenRepository.findAll(paginado);
        Map<String, Object> response = new HashMap<>();

        response.put("categorias", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Imagen save(Imagen imagen) {
        return this.imagenRepository.save(imagen);
    }

    public Imagen one(Long id) {
        return this.imagenRepository.findById(id)
                .orElseThrow(() -> new ImagenNotFoundException(id));
    }

    public Imagen replace(Long id, Imagen imagen) {

        return this.imagenRepository.findById(id).map(p -> (id.equals(imagen.getIdImagen())  ?
                                                            this.imagenRepository.save(imagen) : null))
                .orElseThrow(() -> new ImagenNotFoundException(id));
    }


    public void delete(Long id) {
        Imagen imagen = imagenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Imagen not found"));

        //ANTES DE ELIMINAR LA IMAGEN HAY QUE QUITARLA DEL ARTISTA AL QUE PERTENECE
        Artista artista = imagen.getArtista();
        if (artista != null) {
            artista.getPortfolio().remove(imagen); // Remove from the list
            artistaRepository.save(artista); // Save the update
        }

        //Eliminamos la Imagen
        imagenRepository.delete(imagen);
    }
    //
    public List<Imagen>allByQueryFiltersStream(Optional<String> buscarOptional, Optional<String> ordenarOptional){
        List<Imagen> resultado = new ArrayList<>();

        return resultado;
    }
}