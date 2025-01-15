package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.HopeProjectApplication;
import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Service.RessourceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ressources")
@CrossOrigin(origins = "*")
public class RessourceController {

    @Autowired
    private RessourceService ressourceService;

    @GetMapping
    public ResponseEntity<List<Ressource>> recupererToutesLesRessources() {
        HopeProjectApplication.LOGGER.info("Récupération de toutes les ressources");
        return ressourceService.recupererToutesLesRessources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> recupererRessourceParId(@PathVariable Long id) {
        HopeProjectApplication.LOGGER.info("Récupération de la ressource avec ID : {}", id);
        return ressourceService.recupererRessourceParId(id);
    }

    @PostMapping
    public ResponseEntity<Object> ajouterRessource(@Valid @RequestBody Ressource ressource) {
        HopeProjectApplication.LOGGER.info("Ajout d'une nouvelle ressource : {}", ressource);
        return ressourceService.ajouterRessource(ressource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> modifierRessource(@PathVariable Long id, @Valid @RequestBody Ressource ressource) {
        HopeProjectApplication.LOGGER.info("Modification de la ressource avec ID : {}", id);
        return ressourceService.modifierRessource(id, ressource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> supprimerRessource(@PathVariable Long id) {
        HopeProjectApplication.LOGGER.info("Suppression de la ressource avec ID : {}", id);
        return ressourceService.supprimerRessource(id);
    }

    @PutMapping("/statut/{id}")
    public ResponseEntity<Object> changerStatusRessource(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        HopeProjectApplication.LOGGER.info("Changement de statut de la ressource avec ID : {} en {}", id, status);
        return ressourceService.changerStatusRessource(id, status);
    }
}