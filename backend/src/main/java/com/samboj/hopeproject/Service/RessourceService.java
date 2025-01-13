package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Repository.RessourceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class RessourceService {

    private static final Logger logger = LoggerFactory.getLogger(RessourceService.class);

    @Autowired
    private RessourceRepository ressourceRepository;

    public ResponseEntity<List<Ressource>> recupererToutesLesRessources() {
        logger.info("Récupération de toutes les ressources");
        List<Ressource> ressources = ressourceRepository.findAll();
        return ResponseEntity.ok(ressources);
    }

    public ResponseEntity<Object> recupererRessourceParId(Long id) {
        logger.info("Recherche d'une ressource avec l'ID: {}", id);
        Optional<Ressource> ressource = ressourceRepository.findById(id);
        if (ressource.isPresent()) {
            return ResponseEntity.ok(ressource.get());
        } else {
            logger.warn("Ressource avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Ressource introuvable avec l'ID: " + id);
        }
    }

    public ResponseEntity<Object> ajouterRessource(Ressource ressource) {
        logger.info("Ajout d'une nouvelle ressource avec le titre: {}", ressource.getTitre());
        Ressource nouvelleRessource = ressourceRepository.save(ressource);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouvelleRessource);
    }

    public ResponseEntity<Object> modifierRessource(Long id, Ressource ressource) {
        logger.info("Modification de la ressource avec l'ID: {}", id);
        Optional<Ressource> ressourceExistant = ressourceRepository.findById(id);
        if (!ressourceExistant.isPresent()) {
            logger.warn("Ressource avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Ressource introuvable avec l'ID: " + id);
        }

        Ressource ressourceAMettreAJour = ressourceExistant.get();
        if (ressource.getTitre() != null) ressourceAMettreAJour.setTitre(ressource.getTitre());
        if (ressource.getDomaine() != null) ressourceAMettreAJour.setDomaine(ressource.getDomaine());
        if (ressource.getDescriptionSimple() != null) ressourceAMettreAJour.setDescriptionSimple(ressource.getDescriptionSimple());
        if (ressource.getDescriptionDetaillee() != null) ressourceAMettreAJour.setDescriptionDetaillee(ressource.getDescriptionDetaillee());
        if (ressource.getAcces() != null) ressourceAMettreAJour.setAcces(ressource.getAcces());
        if (ressource.getLien() != null) ressourceAMettreAJour.setLien(ressource.getLien());
        if (ressource.getStatus() != null) ressourceAMettreAJour.setStatus(ressource.getStatus());
        if (ressource.getLimiteFeedBack() != 0) ressourceAMettreAJour.setLimiteFeedBack(ressource.getLimiteFeedBack());

        Ressource ressourceModifiee = ressourceRepository.save(ressourceAMettreAJour);
        logger.info("Ressource avec l'ID {} modifiée avec succès", id);
        return ResponseEntity.ok(ressourceModifiee);
    }

    public ResponseEntity<Object> supprimerRessource(Long id) {
        logger.info("Suppression de la ressource avec l'ID: {}", id);
        if (!ressourceRepository.existsById(id)) {
            logger.warn("Échec - Ressource avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Ressource introuvable avec l'ID: " + id);
        }

        ressourceRepository.deleteById(id);
        logger.info("Ressource avec l'ID {} supprimée avec succès.", id);
        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Ressource supprimée avec succès.");
        return ResponseEntity.ok(response);
    }

    private ResponseEntity<Object> createErrorResponse(HttpStatus status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }

    public ResponseEntity<Object> changerStatusRessource(Long id, String status) {
        Optional<Ressource> ressourceOptional = ressourceRepository.findById(id);

        if (ressourceOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ressource non trouvée avec l'ID : " + id);
        }

        Ressource ressource = ressourceOptional.get();
        try {
            Ressource.Status nouveauStatus = Ressource.Status.valueOf(status.toUpperCase());
            ressource.setStatus(nouveauStatus);
            ressource.setDateDerniereModification(LocalDateTime.now());
            ressourceRepository.save(ressource);
            return ResponseEntity.ok("Status mis à jour avec succès.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Status invalide : " + status);
        }
    }
}