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
        listaImagenes.forEach(imagen -> System.out.println(imagen.getUrl()));
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

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());


        //PRUEBA DE LA CREACION DE MANYTOMANY//
        //CREAMOS VARIAS OFERTAS DE TRABAJO//
        OfertaTrabajo ofertaTrabajo1 = OfertaTrabajo.builder()
                .empresa(empresaService.one(6L))
                .nombrePuesto("Diseñador de personajes 2D")
                .duracionJornada(20)
                .avaiablePositions(2)
                .fechaPublicacion(calendar.getTime())
                .inscripcionHasta(calendar.getTime())
                .salarioBrutoMin(10000)
                .salarioBrutoMax(14000)
                .descripcionPuesto("Diseñador de personajes 2D con experiencia en la creación de personajes originales para videojuegos, animación o cómics. Responsable de conceptualizar, ilustrar y refinar diseños, asegurando coherencia con la estética del proyecto. Domina software como Photoshop, Illustrator o Clip Studio Paint, y comprende principios de anatomía, expresión y color. Colabora con artistas y desarrolladores para adaptar diseños a distintas necesidades. Se valora creatividad, atención al detalle y trabajo en equipo.")
                .artistas(listaArtistas1)
                .build();
        ofertaService.save(ofertaTrabajo1);
        OfertaTrabajo ofertaTrabajo2 = OfertaTrabajo.builder()
                .empresa(empresaService.one(7L))
                .nombrePuesto("Diseñador de personajes 3D")
                .duracionJornada(20)
                .avaiablePositions(2)
                .fechaPublicacion(calendar.getTime())
                .inscripcionHasta(calendar.getTime())
                .salarioBrutoMin(6000)
                .salarioBrutoMax(20000)
                .descripcionPuesto("Buscamos un Diseñador de Personajes 3D con experiencia en modelado, esculpido y texturizado para videojuegos, cine o animación. Será responsable de crear personajes con alto nivel de detalle, optimizados para motores gráficos como Unreal o Unity. Dominio de herramientas como Blender, ZBrush y Substance Painter. Se valorará conocimiento en rigging y animación. Creatividad, atención al detalle y capacidad para trabajar en equipo son esenciales.")
                .artistas(listaArtistas2)
                .build();
        ofertaService.save(ofertaTrabajo2);
        OfertaTrabajo ofertaTrabajo3 = OfertaTrabajo.builder()
                .empresa(empresaService.one(8L))
                .nombrePuesto("Diseñador de Escenarios PixelArt")
                .duracionJornada(20)
                .avaiablePositions(1)
                .fechaPublicacion(calendar.getTime())
                .inscripcionHasta(calendar.getTime())
                .salarioBrutoMin(12000)
                .salarioBrutoMax(24000)
                .descripcionPuesto("Buscamos un diseñador de escenarios PixelArt para crear entornos detallados y atractivos en juegos 2D. Serás responsable de conceptualizar, ilustrar y animar fondos, asegurando coherencia visual y narrativa. Trabajarás con el equipo de arte y desarrollo para optimizar recursos y garantizar una experiencia envolvente. Se requiere dominio de herramientas como Aseprite o Photoshop, creatividad y comprensión de diseño de niveles en juegos retro y modernos.")
                .artistas(listaArtistas3)
                .build();
        ofertaService.save(ofertaTrabajo3);
    }

    /////PRUEBA DEL CRUD DE ARTISTA/////
    @Test
    @Order(1)
    void pruebaCRUDArtista(){
        List<String> categorias1 = new ArrayList<>();
        categorias1.add("digital3d");
        categorias1.add("anime");
        categorias1.add("naturaleza");

        List<String> categorias2 = new ArrayList<>();
        categorias2.add("digital2d");
        categorias2.add("pixelart");
        categorias2.add("retratos");

        List<String> categorias3 = new ArrayList<>();
        categorias3.add("digital2d");
        categorias3.add("Manga");
        categorias3.add("fantasia");

        //CREAR
        //PRUEBA CREAR Y GUARDAR VARIOS ARTISTA
        Artista artista1 = Artista.builder()
                .nombre("VanGogh")
                .username("Markex133")
                .password("12345678")
                .email("email@gmail.com")
                .yearsOfExperience(6)
                .descripcionCorta("Soy un diseñador 3D apasionado por crear modelos detallados y realistas para videojuegos, animación y arquitectura. Domino herramientas como Blender y Maya, y disfruto dando vida a ideas con texturas, iluminación y animaciones que transmitan emoción y realismo.")
                .descripcionLarga("Soy un diseñador 3D apasionado por la creación de modelos, escenarios y animaciones para videojuegos, cine y arquitectura. Me especializo en modelado, texturizado e iluminación, utilizando herramientas como Blender, Maya y ZBrush. Disfruto dando vida a ideas con detalles realistas o estilizados, asegurando calidad y optimización para distintos motores gráficos. Trabajo en equipo con artistas y desarrolladores para lograr experiencias visuales impactantes. Siempre busco innovar, aprender nuevas técnicas y mejorar cada proyecto en el que participo.")
                .categorias(categorias1)
                .build();
        artistaService.save(artista1);
        Artista artista2 = Artista.builder()
                .nombre("SrPelo")
                .username("MrPlXx")
                .password("12345678")
                .email("email@gmail.com")
                .yearsOfExperience(4)
                .categorias(categorias1)
                .descripcionCorta("Apasionado del arte digital, el diseñador 2D crea ilustraciones, personajes y escenarios para juegos, apps y animaciones. Domina herramientas como Photoshop e Illustrator, combinando creatividad y técnica para transmitir ideas visuales con estilo y coherencia estética.")
                .descripcionLarga("Creativo y apasionado por el arte digital, el diseñador 2D transforma ideas en ilustraciones, personajes y escenarios para videojuegos, animaciones y aplicaciones. Domina herramientas como Photoshop, Illustrator y Aseprite, combinando técnica y visión artística para dar vida a mundos envolventes. Su enfoque en la composición, color y estilo le permite crear diseños coherentes y atractivos, adaptándose a distintas estéticas y proyectos. Colabora estrechamente con desarrolladores y otros artistas para optimizar recursos gráficos, asegurando que cada elemento visual encaje perfectamente en la experiencia final. Siempre en busca de innovación, sigue tendencias y perfecciona sus habilidades para ofrecer diseños impactantes y funcionales.")
                .build();
        artistaService.save(artista2);
        Artista artista3 = Artista.builder()
                .nombre("Markex")
                .password("12345678")
                .username("markex2002")
                .email("email@gmail.com")
                .yearsOfExperience(10)
                .categorias(categorias2)
                .descripcionCorta("Apasionado del arte digital, el diseñador 2D crea ilustraciones, personajes y escenarios para juegos, apps y animaciones. Domina herramientas como Photoshop e Illustrator, combinando creatividad y técnica para transmitir ideas visuales con estilo y coherencia estética.")
                .descripcionLarga("Creativo y apasionado por el arte digital, el diseñador 2D transforma ideas en ilustraciones, personajes y escenarios para videojuegos, animaciones y aplicaciones. Domina herramientas como Photoshop, Illustrator y Aseprite, combinando técnica y visión artística para dar vida a mundos envolventes. Su enfoque en la composición, color y estilo le permite crear diseños coherentes y atractivos, adaptándose a distintas estéticas y proyectos. Colabora estrechamente con desarrolladores y otros artistas para optimizar recursos gráficos, asegurando que cada elemento visual encaje perfectamente en la experiencia final. Siempre en busca de innovación, sigue tendencias y perfecciona sus habilidades para ofrecer diseños impactantes y funcionales.")
                .build();
        artistaService.save(artista3);
        Artista artista4 = Artista.builder()
                .nombre("Artista1")
                .password("12345678")
                .username("user1")
                .email("email@gmail.com")
                .yearsOfExperience(10)
                .categorias(categorias2)
                .descripcionCorta("Apasionado del arte digital, el diseñador 2D crea ilustraciones, personajes y escenarios para juegos, apps y animaciones. Domina herramientas como Photoshop e Illustrator, combinando creatividad y técnica para transmitir ideas visuales con estilo y coherencia estética.")
                .descripcionLarga("Creativo y apasionado por el arte digital, el diseñador 2D transforma ideas en ilustraciones, personajes y escenarios para videojuegos, animaciones y aplicaciones. Domina herramientas como Photoshop, Illustrator y Aseprite, combinando técnica y visión artística para dar vida a mundos envolventes. Su enfoque en la composición, color y estilo le permite crear diseños coherentes y atractivos, adaptándose a distintas estéticas y proyectos. Colabora estrechamente con desarrolladores y otros artistas para optimizar recursos gráficos, asegurando que cada elemento visual encaje perfectamente en la experiencia final. Siempre en busca de innovación, sigue tendencias y perfecciona sus habilidades para ofrecer diseños impactantes y funcionales.")
                .build();
        artistaService.save(artista4);
        Artista artista5 = Artista.builder()
                .nombre("Artista2")
                .password("12345678")
                .username("user2")
                .email("email@gmail.com")
                .yearsOfExperience(10)
                .categorias(categorias3)
                .descripcionCorta("Soy un diseñador 2D especializado en estilo manga. Me apasiona crear personajes expresivos, ilustraciones dinámicas y fondos detallados. Domino herramientas como Clip Studio Paint y Photoshop, y disfruto contar historias a través del arte, transmitiendo emoción en cada trazo.")
                .descripcionLarga("Soy un diseñador 2D especializado en arte manga, apasionado por crear personajes expresivos, escenas dinámicas y composiciones impactantes. Mi trabajo combina narrativa visual y emoción en cada ilustración, enfocándome en capturar gestos, perspectivas y detalles que dan vida a cada imagen. Domino herramientas como Clip Studio Paint y Photoshop, además de técnicas de entintado, color y sombreado para lograr un estilo auténtico. Me inspiro en la cultura japonesa y en diversas influencias artísticas para desarrollar ilustraciones originales y memorables. También tengo experiencia en diseño de portadas, concept art y storyboarding, colaborando con escritores y animadores para llevar historias a la vida. Mi objetivo es transmitir emociones y profundidad en cada obra, asegurando que cada imagen cuente una historia única y cautivadora.")
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
                .username("nintenUser1")
                .email("email@gmail.com")
                .numTlf(521522523)
                .password("12345678")
                .email("nintendo@gmail.com")
                .nombreRepresentante("Pedro")
                .build();
        EmpresaService.save(empresa1);
        Empresa empresa2 = Empresa.builder()
                .nombreEmpresa("Sega")
                .password("12345678")
                .username("segaUser1")
                .email("email@gmail.com")
                .numTlf(123456789)
                .nombreRepresentante("Lucas")
                .build();
        EmpresaService.save(empresa2);
        Empresa empresa3 = Empresa.builder()
                .nombreEmpresa("Capcom")
                .username("capcomUser1")
                .email("email@gmail.com")
                .password("12345678")
                .nombreRepresentante("Marcos")
                .numTlf(222333444)
                .build();
        EmpresaService.save(empresa3);
        Empresa empresa4 = Empresa.builder()
                .nombreEmpresa("Mobius")
                .username("mobiusUser1")
                .email("email@gmail.com")
                .password("12345678")
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
                .username("maximoUser1")
                .email("admin@gmail.com")
                .password("1234Admin")
                .build();
        administradorService.save(administrador1);
        Administrador administrador2 = Administrador.builder()
                .privilegeLevel(2)
                .nombre("Steven")
                .username("stevenUser1")
                .email("admin@gmail.com")
                .password("1234Admin")
                .build();
        administradorService.save(administrador2);
        Administrador administrador3 = Administrador.builder()
                .privilegeLevel(3)
                .nombre("Mario")
                .username("marioUser1")
                .email("admin@gmail.com")
                .password("1234Admin")
                .build();
        administradorService.save(administrador3);
        Administrador administrador4 = Administrador.builder()
                .privilegeLevel(2)
                .nombre("Luigi")
                .username("luigiUser1")
                .email("admin@gmail.com")
                .password("1234Admin")
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
                .url("/assets/media/Portfolio1.jpg")
                //.url("../../../resources/media/Portfolio1.jpg")
                .build();
        Imagen imagen2 = Imagen.builder()
                .artista(artista2)
                .url("/assets/media/Portfolio2.jpg")
                .build();
        Imagen imagen3 = Imagen.builder()
                .artista(artista3)
                .url("/assets/media/Portfolio3.jpg")
                .build();
        Imagen imagen4 = Imagen.builder()
                .artista(artista4)
                .url("/assets/media/Portfolio4.png")
                .build();
        Imagen imagen5 = Imagen.builder()
                .artista(artista5)
                .url("/assets/media/Portfolio5.jpg")
                .build();
        imagenService.save(imagen1);
        imagenService.save(imagen2);
        imagenService.save(imagen3);
        imagenService.save(imagen4);
        imagenService.save(imagen5);

        //BORRAR
        imagenService.delete(4L);
    }
}