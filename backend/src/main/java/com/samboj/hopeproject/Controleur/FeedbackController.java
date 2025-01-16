package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.Modele.Feedback;
import com.samboj.hopeproject.Service.FeedbackService;
import com.samboj.hopeproject.Utils.DatabaseInitializer;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ressources")
@CrossOrigin(origins = "*")
public class FeedbackController {
    private final Logger LOGGER = LoggerFactory.getLogger(DatabaseInitializer.class);

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/{id}/feedbacks")
    public ResponseEntity<Object> recupererFeedbacks(@PathVariable Long id) {
        LOGGER.info("Récupération des feedbacks pour la ressource avec ID : {}", id);
        return feedbackService.recupererFeedbacks(id);
    }

    @PostMapping("/{id}/feedback/{utilisateurId}")
    public ResponseEntity<Object> ajouterFeedback(
            @PathVariable Long id,
            @PathVariable Long utilisateurId,
            @Valid @RequestBody Feedback feedback) {
        LOGGER.info("Ajout d'un feedback par l'utilisateur {} pour la ressource {}", utilisateurId, id);
        return feedbackService.ajouterFeedback(id, utilisateurId, feedback);
    }

    @DeleteMapping("/feedback/{feedbackId}")
    public ResponseEntity<Object> supprimerFeedback(@PathVariable Long feedbackId) {
        LOGGER.info("Suppression du feedback avec ID : {}", feedbackId);
        return feedbackService.supprimerFeedback(feedbackId);
    }
}