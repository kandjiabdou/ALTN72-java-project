package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Exception.*;
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

    public ResponseEntity<List<Ressource>> getAllRessources() {
        logger.info("Fetching all ressources");
        List<Ressource> ressources = ressourceRepository.findAll();
        return ResponseEntity.ok(ressources);
    }

    public ResponseEntity<Object> getRessourceById(Long id) {
        logger.info("Fetching ressource with ID: {}", id);
        Ressource ressource = ressourceRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Ressource not found with ID: " + id));
        return ResponseEntity.ok(ressource);
    }

    public ResponseEntity<Object> createRessource(Ressource ressource) {
        logger.info("Adding new ressource with title: {}", ressource.getTitre());
        Ressource savedRessource = ressourceRepository.save(ressource);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRessource);
    }

    public ResponseEntity<Object> updateRessource(Long id, Ressource ressource) {
        logger.info("Updating ressource with ID: {}", id);

        Ressource existingRessource = ressourceRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Ressource not found with ID: " + id));

        updateRessourceFields(existingRessource, ressource);

        Ressource updatedRessource = ressourceRepository.save(existingRessource);
        logger.info("Ressource with ID {} updated successfully", id);
        return ResponseEntity.ok(updatedRessource);
    }

    public ResponseEntity<Object> deleteRessource(Long id) {
        logger.info("Deleting ressource with ID: {}", id);

        if (!ressourceRepository.existsById(id)) {
            logger.warn("Deletion failed - Ressource not found with ID: {}", id);
            throw new RessourceNotFoundException("Ressource not found with ID: " + id);
        }

        ressourceRepository.deleteById(id);
        logger.info("Ressource with ID {} deleted successfully", id);
        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Ressource deleted successfully");
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> changeRessourceStatus(Long id, String status) {
        Ressource ressource = ressourceRepository.findById(id)
                .orElseThrow(() -> new RessourceNotFoundException("Ressource not found with ID: " + id));

        try {
            Ressource.Status newStatus = Ressource.Status.valueOf(status.toUpperCase());
            ressource.setStatus(newStatus);
            ressource.setDateDerniereModification(LocalDateTime.now());
            ressourceRepository.save(ressource);
            return ResponseEntity.ok("Status updated successfully");
        } catch (IllegalArgumentException e) {
            logger.error("Invalid status value: {}", status);
            throw new InvalidStatusException("Invalid status: " + status);
        }
    }

    private void updateRessourceFields(Ressource existingRessource, Ressource ressource) {
        if (ressource.getTitre() != null) existingRessource.setTitre(ressource.getTitre());
        if (ressource.getDomaine() != null) existingRessource.setDomaine(ressource.getDomaine());
        if (ressource.getDescriptionSimple() != null) existingRessource.setDescriptionSimple(ressource.getDescriptionSimple());
        if (ressource.getDescriptionDetaillee() != null) existingRessource.setDescriptionDetaillee(ressource.getDescriptionDetaillee());
        if (ressource.getAcces() != null) existingRessource.setAcces(ressource.getAcces());
        if (ressource.getLien() != null) existingRessource.setLien(ressource.getLien());
        if (ressource.getLimiteFeedBack() != 0) existingRessource.setLimiteFeedBack(ressource.getLimiteFeedBack());
    }
}
