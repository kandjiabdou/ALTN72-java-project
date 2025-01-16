package com.samboj.hopeproject.Repository;

import com.samboj.hopeproject.Modele.Feedback;
import com.samboj.hopeproject.Modele.Ressource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByRessource(Ressource ressource);
    long countByRessource(Ressource ressource);
}