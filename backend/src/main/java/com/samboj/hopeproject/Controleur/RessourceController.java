package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Service.RessourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ressources")
@CrossOrigin(origins = "*")
public class RessourceController {

    @Autowired
    private RessourceService ressourceService;

    @GetMapping
    public ResponseEntity<List<Ressource>> recupererToutesLesRessources() {
        return ressourceService.recupererToutesLesRessources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> recupererRessourceParId(@PathVariable Long id) {
        return ressourceService.recupererRessourceParId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> ajouterRessource(@RequestBody Ressource ressource) {
        return ressourceService.ajouterRessource(ressource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> modifierRessource(@PathVariable Long id, @RequestBody Ressource ressource) {
        return ressourceService.modifierRessource(id, ressource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> supprimerRessource(@PathVariable Long id) {
        return ressourceService.supprimerRessource(id);
    }
}
