package com.viktor.comicalert.service;

import com.viktor.comicalert.model.Collectible;
import com.viktor.comicalert.repositories.CollectibleRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class CollectibleService {

    @Value("${storage.location}")
    private String storageLocation;

    private final CollectibleRepository collectibleRepository;

    public CollectibleService(CollectibleRepository collectibleRepository) {
        this.collectibleRepository = collectibleRepository;
    }

    public Collectible save (Collectible collectible){
        return collectibleRepository.save(collectible);
    }

    public List<Collectible> findAll(){
        return collectibleRepository.findAll();
    }

    public void delete(Long id){
        Optional<Collectible> collectibleOptional = collectibleRepository.findById(id);

        if(collectibleOptional.isPresent()){
            collectibleRepository.deleteById(id);

            String fileName = collectibleOptional.get().getImagePath();
            Path filePath = Paths.get(storageLocation, fileName);
            System.out.println(filePath);

            try{
                Files.deleteIfExists(filePath);
            }catch(IOException e){
                System.err.println("Couldnt delete File");
            }

        }else{
            System.out.println("couldnt delete collectible");
        }

    }

    public Collectible update(Long id, Collectible collectibleData){
        Optional<Collectible> optionalCollectible = collectibleRepository.findById(id);
        if(optionalCollectible.isPresent()){
            Collectible collectible = optionalCollectible.get();
            collectible.setName(collectibleData.getName());
            collectible.setReleaseDate(collectibleData.getReleaseDate());
            return collectibleRepository.save(collectible);
        }else{
            return null;
        }
    }
}
