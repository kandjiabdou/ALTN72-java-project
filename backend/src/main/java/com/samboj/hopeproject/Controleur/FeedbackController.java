package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.HopeProjectApplication;
import com.samboj.hopeproject.Modele.Feedback;
import com.samboj.hopeproject.Service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ressources")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/{id}/feedbacks")
    public ResponseEntity<Object> recupererFeedbacks(@PathVariable Long id) {
        HopeProjectApplication.LOGGER.info("Récupération des feedbacks pour la ressource avec ID : {}", id);
        return feedbackService.recupererFeedbacks(id);
    }

    @PostMapping("/{id}/feedback/{utilisateurId}")
    public ResponseEntity<Object> ajouterFeedback(
            @PathVariable Long id,
            @PathVariable Long utilisateurId,
            @Valid @RequestBody Feedback feedback) {
        HopeProjectApplication.LOGGER.info("Ajout d'un feedback par l'utilisateur {} pour la ressource {}", utilisateurId, id);
        return feedbackService.ajouterFeedback(id, utilisateurId, feedback);
    }

    @DeleteMapping("/feedback/{feedbackId}")
    public ResponseEntity<Object> supprimerFeedback(@PathVariable Long feedbackId) {
        HopeProjectApplication.LOGGER.info("Suppression du feedback avec ID : {}", feedbackId);
        return feedbackService.supprimerFeedback(feedbackId);
    }
}