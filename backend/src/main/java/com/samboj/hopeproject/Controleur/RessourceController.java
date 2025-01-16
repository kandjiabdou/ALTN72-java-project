package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Service.RessourceService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ressources")
@CrossOrigin(origins = "*")
public class RessourceController {
    private final Logger LOGGER = LoggerFactory.getLogger(RessourceController.class);

    @Autowired
    private RessourceService ressourceService;

    @GetMapping
    public ResponseEntity<List<Ressource>> recupererToutesLesRessources() {
        LOGGER.info("Récupération de toutes les ressources");
        return ressourceService.getAllRessources();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> recupererRessourceParId(@PathVariable Long id) {
        LOGGER.info("Récupération de la ressource avec ID : {}", id);
        return ressourceService.getRessourceById(id);
    }

    @PostMapping
    public ResponseEntity<Object> ajouterRessource(@Valid @RequestBody Ressource ressource) {
        LOGGER.info("Ajout d'une nouvelle ressource : {}", ressource);
        return ressourceService.createRessource(ressource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> modifierRessource(@PathVariable Long id, @Valid @RequestBody Ressource ressource) {
        LOGGER.info("Modification de la ressource avec ID : {}", id);
        return ressourceService.updateRessource(id, ressource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> supprimerRessource(@PathVariable Long id) {
        LOGGER.info("Suppression de la ressource avec ID : {}", id);
        return ressourceService.deleteRessource(id);
    }

    @PutMapping("/statut/{id}")
    public ResponseEntity<Object> changerStatusRessource(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        LOGGER.info("Changement de statut de la ressource avec ID : {} en {}", id, status);
        return ressourceService.changeRessourceStatus(id, status);
    }
}