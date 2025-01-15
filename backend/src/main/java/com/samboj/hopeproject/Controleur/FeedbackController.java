package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.Modele.Feedback;
import com.samboj.hopeproject.Service.FeedbackService;
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
        return feedbackService.recupererFeedbacks(id);
    }

    @PostMapping("/{ressourceId}/feedback/{utilisateurId}")
    public ResponseEntity<Object> ajouterFeedback(
            @PathVariable Long ressourceId,
            @PathVariable Long utilisateurId,
            @RequestBody Feedback feedback) {
        return feedbackService.ajouterFeedback(ressourceId, utilisateurId, feedback);
    }

    @DeleteMapping("/feedback/{feedbackId}")
    public ResponseEntity<Object> supprimerFeedback(@PathVariable Long feedbackId) {
        return feedbackService.supprimerFeedback(feedbackId);
    }
}