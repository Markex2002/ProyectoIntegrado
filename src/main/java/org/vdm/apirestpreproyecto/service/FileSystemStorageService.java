package org.vdm.apirestpreproyecto.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileSystemStorageService implements StorageService{

    ////////LA RUTA EN EL QUE APARECERA EL DIRECTORIO EN EL QUE SE GUARDARA LOS ASSETS///////
    @Value("src/main/frontend/app-ProyectoArt/src/assets")
    //@Value("mediafiles")
    private String mediaLocation;

    private Path rootLocation;


    //VIGILAR PROBLEMAS CON LOS IOEXCEPTION
    @Override
    @PostConstruct
    public void init() throws IOException {
        rootLocation = Paths.get(mediaLocation);
        Files.createDirectories(rootLocation);
    }



    //METODO PARA ALMACENAR EL ARCHIVO
    @Override
    public String store(MultipartFile file) {
        try{
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store Empty File");
            }
            String fileName = file.getOriginalFilename();
            Path destinationFile =rootLocation.resolve(Paths.get(fileName))
                    .normalize().toAbsolutePath();

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
            return fileName;
        } catch (IOException e){
            throw new RuntimeException("Failed to store File", e);
        }
    }


    //METODO PARA CARGAR EL ARCHIVO
    @Override
    public Resource loadAsResource(String filename) {
        try{
            Path file = rootLocation.resolve(Paths.get(filename));
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read file: " + filename);
            }
        } catch (MalformedURLException e){
            throw new RuntimeException("Could not read file: " + filename, e);
        }
    }
}
