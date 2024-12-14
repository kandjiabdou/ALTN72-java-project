package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Repository.RessourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RessourceService {

    @Autowired
    private RessourceRepository ressourceRepository;

    public List<Ressource> recupererTousLesRessources() {
        return ressourceRepository.findAll();
    }

    public Optional<Ressource> recupererRessourceParId(Long id) {
        return ressourceRepository.findById(id);
    }

    public Ressource ajouterRessource(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }

    public void supprimerRessource(Long id) {
        ressourceRepository.deleteById(id);
    }

}
