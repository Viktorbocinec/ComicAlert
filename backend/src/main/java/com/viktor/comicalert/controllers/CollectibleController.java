package com.viktor.comicalert.controllers;

import com.viktor.comicalert.model.Collectible;
import com.viktor.comicalert.service.CollectibleService;
import com.viktor.comicalert.service.StorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("collectibles")
public class CollectibleController {

    private final CollectibleService collectibleService;

    private final StorageService storageService;

    public CollectibleController(CollectibleService collectibleService, StorageService storageService) {
        this.collectibleService = collectibleService;
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Collectible> uploadComic(@RequestParam("name") String name,
                                                   @RequestParam("orderSource") String orderSource,
                                                   @RequestParam("releaseDate") String releaseDateString,
                                                   @RequestParam(value = "imagePath", required = false) MultipartFile imagePath) throws IOException {
        LocalDate releaseDate = LocalDate.parse(releaseDateString, DateTimeFormatter.ISO_DATE);

        Collectible collectible = new Collectible();
        collectible.setName(name);
        collectible.setReleaseDate(releaseDate);
        collectible.setOrderSource(orderSource);
        if (imagePath != null && !imagePath.isEmpty()) {
            String fileName = storageService.storeFile(imagePath);
            collectible.setImagePath(fileName);
        }


        Collectible savedCollectible = collectibleService.save(collectible);

        return new ResponseEntity<>(savedCollectible, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Collectible>> getAllCollectibles(){
        List<Collectible> collectibles = collectibleService.findAll();
        return new ResponseEntity<>(collectibles, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCollectible(@PathVariable Long id){
        collectibleService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Collectible> updateCollectible(@PathVariable Long id, @RequestBody Collectible collectible){
        Collectible updatedCollectible = collectibleService.update(id, collectible);
        if(updatedCollectible == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(updatedCollectible);
        }
    }

}

