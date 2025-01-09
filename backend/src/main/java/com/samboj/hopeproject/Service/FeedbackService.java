package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Modele.Feedback;
import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Repository.FeedbackRepository;
import com.samboj.hopeproject.Repository.RessourceRepository;
import com.samboj.hopeproject.Repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private RessourceRepository ressourceRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public ResponseEntity<Object> recupererFeedbacks(Long ressourceId) {
        Ressource ressource = ressourceRepository.findById(ressourceId).orElse(null);
        if (ressource == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ressource introuvable.");
        }

        List<Feedback> feedbacks = feedbackRepository.findByRessource(ressource);
        Map<String, Object> response = new HashMap<>();
        response.put("total", feedbacks.size());
        response.put("feedbacks", feedbacks.stream().map(this::mapFeedbackToResponse).collect(Collectors.toList()));

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> ajouterFeedback(Long ressourceId, Long utilisateurId, Feedback feedback) {
        Ressource ressource = ressourceRepository.findById(ressourceId).orElse(null);
        if (ressource == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ressource introuvable.");
        }

        if (feedbackRepository.countByRessource(ressource) >= ressource.getLimiteFeedBack()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Limite de feedback atteinte pour cette ressource.");
        }

        Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId).orElse(null);
        if (utilisateur == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur introuvable.");
        }

        feedback.setRessource(ressource);
        feedback.setUtilisateur(utilisateur);
        feedbackRepository.save(feedback);

        return ResponseEntity.status(HttpStatus.CREATED).body("Feedback ajouté avec succès.");
    }


    private Map<String, Object> mapFeedbackToResponse(Feedback feedback) {
        Map<String, Object> feedbackResponse = new HashMap<>();
        feedbackResponse.put("id", feedback.getId());
        feedbackResponse.put("contenu", feedback.getContenu());
        feedbackResponse.put("auteur", Map.of(
                "id", feedback.getUtilisateur().getIdUser(),
                "nom", feedback.getUtilisateur().getNom(),
                "role", feedback.getUtilisateur().getRole()
        ));
        return feedbackResponse;
    }
}
