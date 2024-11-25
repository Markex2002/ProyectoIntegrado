package org.vdm.apirestpreproyecto;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.vdm.apirestpreproyecto.domain.*;
import org.vdm.apirestpreproyecto.service.*;


import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ApiRestPreProyectoApplicationTests {

    @Autowired
    ArtistaService artistaService;
    @Autowired
    EmpresaService EmpresaService;
    @Autowired
    ImagenService imagenService;
    @Autowired
    AdministradorService administradorService;
    @Autowired
    OfertaService ofertaService;
    @Autowired
    IdiomaService idiomaService;
    @Autowired
    private EmpresaService empresaService;

    @Test
    void contextLoads() {}


    @Test
    @Order(7)
    void testPersistenciaOneToMany() {
        List<Imagen> listaImagenes = artistaService.one(1L).getPortfolio();
        listaImagenes.forEach(imagen -> System.out.println(imagen.getNombre()));
    }


    //TESTPRINCIPAL
    //PRUEBA DE TODOS LOS CRUDS Y CREACION DE RELACIONES
    @Test
    @Order(5)
    void pruebaCRUDTodo(){
        /////ESTO NO ES NECESARIO, EL PORTFOLIO SE CREA SOLO/////
        //Creamos un PortFolio y lo insertamos en el Artista//
        //List<Imagen> listaImagenes = imagenService.all();
        //List<Imagen> listaPotfolio = new ArrayList<>();

        //listaImagenes.forEach(imagen -> {
        //    if (imagen.getArtista().getId() == artistaService.one(1L).getId()) {
        //        listaPotfolio.add(imagen);
        //    }
        //});
        //artistaService.one(1L).setPortfolio(listaPotfolio);



        //IMPORTANTE TENER ARTISTAS EN LA DB//
        //Creamos una lista con el Artista//
        Set<Artista> listaArtistas1 = new HashSet<>();
        listaArtistas1.add(artistaService.one(1L));

        Set<Artista> listaArtistas2 = new HashSet<>();
        listaArtistas2.add(artistaService.one(2L));

        //Creamos una lista con el Artista//
        Set<Artista> listaArtistas3 = new HashSet<>();
        listaArtistas3.add(artistaService.one(1L));
        listaArtistas3.add(artistaService.one(2L));


        //PRUEBA DE LA CREACION DE MANYTOMANY//
        //CREAMOS VARIAS OFERTAS DE TRABAJO//
        OfertaTrabajo ofertaTrabajo1 = OfertaTrabajo.builder()
                .empresa(empresaService.one(6L))
                .duracionJornada(20)
                .avaiablePositions(2)
                .salarioBrutoMin(10000)
                .salarioBrutoMax(14000)
                .artistas(listaArtistas1)
                .build();
        ofertaService.save(ofertaTrabajo1);
        OfertaTrabajo ofertaTrabajo2 = OfertaTrabajo.builder()
                .empresa(empresaService.one(7L))
                .duracionJornada(20)
                .avaiablePositions(2)
                .salarioBrutoMin(6000)
                .salarioBrutoMax(20000)
                .artistas(listaArtistas2)
                .build();
        ofertaService.save(ofertaTrabajo2);
        OfertaTrabajo ofertaTrabajo3 = OfertaTrabajo.builder()
                .empresa(empresaService.one(8L))
                .duracionJornada(20)
                .avaiablePositions(1)
                .salarioBrutoMin(12000)
                .salarioBrutoMax(24000)
                .artistas(listaArtistas3)
                .build();
        ofertaService.save(ofertaTrabajo3);
    }

    /////PRUEBA DEL CRUD DE ARTISTA/////
    @Test
    @Order(1)
    void pruebaCRUDArtista(){
        List<String> categorias1 = new ArrayList<>();
        categorias1.add("categoria2");
        categorias1.add("categoria3");

        List<String> categorias2 = new ArrayList<>();
        categorias2.add("categoria1");
        categorias2.add("categoria3");

        //CREAR
        //PRUEBA CREAR Y GUARDAR VARIOS ARTISTA
        Artista artista1 = Artista.builder()
                .nombre("VanGogh")
                .username("Markex133")
                .password("1234")
                .email("email@gmail.com")
                .yearsOfExperience(6)
                .descripcionCorta("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 150")
                .descripcionLarga("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.")
                .categorias(categorias1)
                .build();
        artistaService.save(artista1);
        Artista artista2 = Artista.builder()
                .nombre("SrPelo")
                .username("MrPlXx")
                .password("1234")
                .yearsOfExperience(4)
                .categorias(categorias2)
                .descripcionCorta("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 150")
                .descripcionLarga("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.")
                .build();
        artistaService.save(artista2);
        Artista artista3 = Artista.builder()
                .nombre("Markex")
                .password("psswd")
                .username("markex2002")
                .yearsOfExperience(10)
                .categorias(categorias1)
                .descripcionCorta("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 150")
                .descripcionLarga("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.")
                .build();
        artistaService.save(artista3);
        Artista artista4 = Artista.builder()
                .nombre("Artista1")
                .password("1234")
                .username("user1")
                .yearsOfExperience(10)
                .categorias(categorias1)
                .descripcionCorta("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 150")
                .descripcionLarga("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.")
                .build();
        artistaService.save(artista4);
        Artista artista5 = Artista.builder()
                .nombre("Artista2")
                .password("1234")
                .username("user2")
                .yearsOfExperience(10)
                .categorias(categorias2)
                .descripcionCorta("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 150")
                .descripcionLarga("Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.")
                .build();
        artistaService.save(artista5);


        //BORRAR
        //artistaService.delete(3L);

        //EDITAR
        artista2.setNombre("SrPelonazo");
        artistaService.save(artista2);
    }

    /////PRUEBA DEL CRUD DE EMPRESA/////
    @Test
    @Order(2)
    void pruebaCRUDEmpresa(){
        //CREAR
        //PRUEBA CREAR Y GUARDAR VARIAS EMPRESAS
        Empresa empresa1 = Empresa.builder()
                .nombreEmpresa("Nintendo")
                .numTlf(521522523)
                .password("1234")
                .email("nintendo@gmail.com")
                .nombreRepresentante("Pedro")
                .build();
        EmpresaService.save(empresa1);
        Empresa empresa2 = Empresa.builder()
                .nombreEmpresa("Sega")
                .numTlf(123456789)
                .nombreRepresentante("Lucas")
                .build();
        EmpresaService.save(empresa2);
        Empresa empresa3 = Empresa.builder()
                .nombreEmpresa("Capcom")
                .nombreRepresentante("Marcos")
                .numTlf(222333444)
                .build();
        EmpresaService.save(empresa3);
        Empresa empresa4 = Empresa.builder()
                .nombreEmpresa("Mobius")
                .nombreRepresentante("Juan")
                .numTlf(111333666)
                .build();
        EmpresaService.save(empresa4);


        //BORRAR
        empresaService.delete(9L);

        //EDITAR
        empresa1.setNombreEmpresa("Noentiendo");
        empresaService.save(empresa1);
    }

    /////PRUEBA DEL CRUD DE ADMINISTRADOR/////
    @Test
    @Order(3)
    void pruebaCRUDAdministrador(){
        //CREAR
        //PRUEBA CREAR Y GUARDAR VARIOS ADMINISTRADORES
        Administrador administrador1 = Administrador.builder()
                .privilegeLevel(1)
                .nombre("Maximo")
                .email("admin@gmail.com")
                .password("1234Admin")
                .build();
        administradorService.save(administrador1);
        Administrador administrador2 = Administrador.builder()
                .privilegeLevel(2)
                .nombre("Steven")
                .build();
        administradorService.save(administrador2);
        Administrador administrador3 = Administrador.builder()
                .privilegeLevel(3)
                .nombre("Mario")
                .build();
        administradorService.save(administrador3);
        Administrador administrador4 = Administrador.builder()
                .privilegeLevel(2)
                .nombre("Luigi")
                .build();
        administradorService.save(administrador4);

        //BORRAR
        administradorService.delete(12L);

        //EDITAR
        administrador1.setNombre("Waluigi");
        administradorService.save(administrador1);
    }

    /////PRUEBA DEL CRUD DE IDIOMAS/////
    @Test
    @Order(6)
    void pruebaCRUDIdioma(){
        //IMPORTANTE TENER ARTISTAS EN LA DB//
        //Creamos una lista con el Artista//
        Set<Artista> listaArtistas1 = new HashSet<>();
        listaArtistas1.add(artistaService.one(1L));

        Set<Artista> listaArtistas2 = new HashSet<>();
        listaArtistas2.add(artistaService.one(2L));

        //Creamos una lista con el Artista//
        Set<Artista> listaArtistas3 = new HashSet<>();
        listaArtistas3.add(artistaService.one(1L));
        listaArtistas3.add(artistaService.one(2L));
        //Importante que esto no este vacio o fallará
        OfertaTrabajo ofertaTrabajo = ofertaService.one(1L);

        //Creacion de un Date
        LocalDateTime fechaActual = LocalDateTime.now();
        ZonedDateTime zonedDateTime = fechaActual.atZone(ZoneId.systemDefault());
        Date dateFechaActrual = Date.from(zonedDateTime.toInstant());


        //CREAR
        Idioma idioma1 = Idioma.builder()
                .ultimaActualizacion(dateFechaActrual)
                .artistas(listaArtistas1)
                .ofertaTrabajo(ofertaTrabajo)
                .nombre("Spanish")
                .build();
        idiomaService.save(idioma1);
        Idioma idioma2 = Idioma.builder()
                .ultimaActualizacion(dateFechaActrual)
                .nombre("English")
                .artistas(listaArtistas2)
                .ofertaTrabajo(ofertaTrabajo)
                .build();
        idiomaService.save(idioma2);
        Idioma idioma3 = Idioma.builder()
                .ultimaActualizacion(dateFechaActrual)
                .artistas(listaArtistas3)
                .ofertaTrabajo(ofertaTrabajo)
                .nombre("French")
                .build();
        idiomaService.save(idioma3);
        Idioma idioma4 = Idioma.builder()
                .ultimaActualizacion(dateFechaActrual)
                .artistas(listaArtistas1)
                .ofertaTrabajo(ofertaTrabajo)
                .nombre("Japanese")
                .build();
        idiomaService.save(idioma4);

        //BORRAR
        idiomaService.delete(4L);

        //EDITAR
        //idioma3.setNombre("Chinese");
        //idiomaService.save(idioma3);
    }

    /////PRUEBA DEL CRUD DE IMAGEN/////
    @Test
    @Order(4)
    void pruebaCRUDImagen(){
        //Importante que esto no este vacio o fallará
        Artista artista1 = artistaService.one(1L);
        Artista artista2 = artistaService.one(2L);
        Artista artista3 = artistaService.one(3L);
        Artista artista4 = artistaService.one(4L);
        Artista artista5 = artistaService.one(5L);




        //CREAR
        Imagen imagen1 = Imagen.builder()
                .artista(artista1)
                .url("/assets/Portfolio1.jpg")
                .nombre("img1")
                .build();
        Imagen imagen2 = Imagen.builder()
                .artista(artista2)
                .url("/assets/Portfolio2.jpg")
                .nombre("img2")
                .build();
        Imagen imagen3 = Imagen.builder()
                .artista(artista3)
                .url("/assets/Portfolio3.jpg")
                .nombre("img3")
                .build();
        Imagen imagen4 = Imagen.builder()
                .artista(artista4)
                .url("/assets/Portfolio4.png")
                .nombre("img4")
                .build();
        Imagen imagen5 = Imagen.builder()
                .artista(artista5)
                .url("/assets/Portfolio5.jpg")
                .nombre("img5")
                .build();
        imagenService.save(imagen1);
        imagenService.save(imagen2);
        imagenService.save(imagen3);
        imagenService.save(imagen4);
        imagenService.save(imagen5);

        //BORRAR
        imagenService.delete(4L);

        //EDITAR
        imagen3.setNombre("img999");
        imagenService.save(imagen3);
    }
}