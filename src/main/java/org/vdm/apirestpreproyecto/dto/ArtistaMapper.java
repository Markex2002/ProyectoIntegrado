package org.vdm.apirestpreproyecto.dto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.vdm.apirestpreproyecto.domain.Artista;

@Mapper(componentModel = "spring")
public interface ArtistaMapper {

    ArtistaMapper INSTANCE = Mappers.getMapper(ArtistaMapper.class);

    ArtistaDTO artistaAArtistaDTO(Artista artista);
}