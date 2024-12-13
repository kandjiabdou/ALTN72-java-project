package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Service.RessourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ressources")
public class RessourceController {

    @Autowired
    private RessourceService ressourceService;

    @GetMapping
    public List<Ressource> recupererTousLesRessources() {
        return ressourceService.recupererTousLesRessources();
    }

    @GetMapping("/{id}")
    public Ressource recupererRessourceParId(@PathVariable Long id) {
        return ressourceService.recupererRessourceParId(id).orElse(null);
    }

    @PostMapping
    public Ressource ajouterRessource(@RequestBody Ressource ressource) {
        return ressourceService.ajouterRessource(ressource);
    }

    @DeleteMapping("/{id}")
    public void supprimerRessource(@PathVariable Long id) {
        ressourceService.supprimerRessource(id);
    }
}
