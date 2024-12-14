package com.samboj.hopeproject.Repository;

import com.samboj.hopeproject.Modele.Ressource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RessourceRepository extends JpaRepository<Ressource, Long> {
    List<Ressource> findByDomaineContaining(String domaine);
}

