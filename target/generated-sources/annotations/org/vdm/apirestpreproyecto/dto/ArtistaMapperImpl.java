package org.vdm.apirestpreproyecto.dto;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import org.vdm.apirestpreproyecto.domain.Artista;
import org.vdm.apirestpreproyecto.domain.Idioma;
import org.vdm.apirestpreproyecto.domain.Imagen;
import org.vdm.apirestpreproyecto.domain.OfertaTrabajo;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-03T10:06:58+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class ArtistaMapperImpl implements ArtistaMapper {

    @Override
    public ArtistaDTO artistaAArtistaDTO(Artista artista) {
        if ( artista == null ) {
            return null;
        }

        ArtistaDTO artistaDTO = new ArtistaDTO();

        artistaDTO.setNombre( artista.getNombre() );
        artistaDTO.setDescripcionCorta( artista.getDescripcionCorta() );
        artistaDTO.setDescripcionLarga( artista.getDescripcionLarga() );
        artistaDTO.setYearsOfExperience( artista.getYearsOfExperience() );
        List<Imagen> list = artista.getPortfolio();
        if ( list != null ) {
            artistaDTO.setPortfolio( new ArrayList<Imagen>( list ) );
        }
        List<Idioma> list1 = artista.getIdiomasHablados();
        if ( list1 != null ) {
            artistaDTO.setIdiomasHablados( new ArrayList<Idioma>( list1 ) );
        }
        Set<OfertaTrabajo> set = artista.getOfertasTrabajos();
        if ( set != null ) {
            artistaDTO.setOfertasTrabajos( new LinkedHashSet<OfertaTrabajo>( set ) );
        }

        return artistaDTO;
    }
}
