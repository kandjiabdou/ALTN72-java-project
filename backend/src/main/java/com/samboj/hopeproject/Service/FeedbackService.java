package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Modele.Feedback;
import com.samboj.hopeproject.Repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> recupererTousLesFeedbacks() {
        return feedbackRepository.findAll();
    }

    public Feedback ajouterFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public void supprimerFeedback(Long idRessource) {
        feedbackRepository.deleteById(idRessource);
    }
}
