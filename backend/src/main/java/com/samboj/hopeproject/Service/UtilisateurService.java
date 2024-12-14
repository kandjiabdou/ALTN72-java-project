package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UtilisateurService {

    private static final Logger logger = LoggerFactory.getLogger(UtilisateurService.class);

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private ResponseEntity<Object> createErrorResponse(HttpStatus status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }

    public ResponseEntity<List<Utilisateur>> recupererTousLesUtilisateurs() {
        logger.info("Récupération de tous les utilisateurs");
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        return ResponseEntity.ok(utilisateurs);
    }

    public ResponseEntity<Object> recupererUtilisateurParId(Long id) {
        logger.info("Recherche d'un utilisateur avec l'ID: {}", id);
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
        if (utilisateur.isPresent()) {
            return ResponseEntity.ok(utilisateur.get());
        } else {
            logger.warn("Utilisateur avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
        }
    }


    public ResponseEntity<Object> recupererUtilisateurParLogin(String login) {
        logger.info("Recherche d'un utilisateur avec le login: {}", login);
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByLogin(login);
        if (utilisateur.isPresent()) {
            return ResponseEntity.ok(utilisateur.get());
        } else {
            logger.warn("Utilisateur avec le login {} introuvable", login);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec le login: " + login);
        }
    }

    public ResponseEntity<Object> ajouterUtilisateur(Utilisateur utilisateur) {
        logger.info("Ajout d'un nouvel utilisateur avec le login: {}", utilisateur.getLogin());

        if (utilisateur.getLogin() == null || utilisateur.getMdp() == null || utilisateur.getRole() == null) {
            logger.error("Échec de la validation - Champs requis manquants.");
            return createErrorResponse(HttpStatus.BAD_REQUEST, "Les champs login, mot de passe et role sont obligatoires.");
        }

        if (utilisateurRepository.findByLogin(utilisateur.getLogin()).isPresent()) {
            logger.error("Échec - Un utilisateur avec le login {} existe déjà.", utilisateur.getLogin());
            return createErrorResponse(HttpStatus.CONFLICT, "Un utilisateur avec ce login existe déjà.");
        }

        Utilisateur savedUser = utilisateurRepository.save(utilisateur);
        logger.info("Utilisateur ajouté avec succès: ID = {}", savedUser.getIdUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    public ResponseEntity<Object> supprimerUtilisateur(Long id) {
        logger.info("Suppression de l'utilisateur avec l'ID: {}", id);
        if (!utilisateurRepository.existsById(id)) {
            logger.warn("Échec - Utilisateur avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
        }

        utilisateurRepository.deleteById(id);
        logger.info("Utilisateur avec l'ID {} supprimé avec succès.", id);
        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Utilisateur supprimé avec succès.");
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> modifierUtilisateur(Long id, Utilisateur utilisateur) {
        logger.info("Modification de l'utilisateur avec l'ID: {}", id);
        Optional<Utilisateur> utilisateurExistant = utilisateurRepository.findById(id);
        if (!utilisateurExistant.isPresent()) {
            logger.warn("Utilisateur avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
        }

        Utilisateur utilisateurAMettreAJour = utilisateurExistant.get();
        if (utilisateur.getLogin() != null) utilisateurAMettreAJour.setLogin(utilisateur.getLogin());
        if (utilisateur.getMdp() != null) utilisateurAMettreAJour.setMdp(utilisateur.getMdp());
        if (utilisateur.getRole() != null) utilisateurAMettreAJour.setRole(utilisateur.getRole());

        Utilisateur utilisateurMisAJour = utilisateurRepository.save(utilisateurAMettreAJour);
        logger.info("Utilisateur avec l'ID {} modifié avec succès", id);
        return ResponseEntity.ok(utilisateurMisAJour);
    }
}
