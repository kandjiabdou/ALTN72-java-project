package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Utils.TokenConfig;
import com.samboj.hopeproject.Exception.ErrorResponse;
import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Modele.UtilisateurDto;
import com.samboj.hopeproject.Repository.UtilisateurRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UtilisateurService {

    private static final Logger logger = LoggerFactory.getLogger(UtilisateurService.class);

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private TokenConfig tokenConfig;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private ErrorResponse errorResponse;

    private Utilisateur maskPassword(Utilisateur utilisateur) {
        utilisateur.setMdp(null);
        return utilisateur;
    }

    public ResponseEntity<Object> login(String login, String mdp) {
        logger.info("Tentative de connexion pour le login: {}", login);

        return utilisateurRepository.findByLogin(login)
                .filter(user -> passwordEncoder.matches(mdp, user.getMdp()))
                .map(user -> {
                    String token = tokenConfig.generateToken(user.getIdUser());
                    Map<String, Object> response = Map.of(
                            "token", token,
                            "message", "Connexion réussie."
                    );
                    logger.info("Connexion réussie pour le login: {}", login);
                    // Utilisation de ResponseEntity<Object> ici
                    return ResponseEntity.ok((Object) response); // Cast de Map<String, Object> en Object
                })
                .orElseGet(() -> {
                    logger.warn("Échec de connexion pour le login: {}", login);
                    return errorResponse.createErrorResponse(HttpStatus.UNAUTHORIZED, "Login ou mot de passe incorrect.");
                });
    }


    public ResponseEntity<List<Utilisateur>> getAllUtilisateurs() {
        logger.info("Récupération de tous les utilisateurs");
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll()
                .stream()
                .map(this::maskPassword)
                .collect(Collectors.toList());
        return ResponseEntity.ok(utilisateurs);
    }

    public ResponseEntity<Object> getUtilisateurById(Long id) {
        logger.info("Recherche d'un utilisateur avec l'ID: {}", id);

        return utilisateurRepository.findById(id)
                .map(user -> ResponseEntity.ok((Object) maskPassword(user))) // Cast de l'objet
                .orElseGet(() -> {
                    logger.warn("Utilisateur avec l'ID {} introuvable", id);
                    return errorResponse.createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
                });
    }


    public ResponseEntity<Object> getUtilisateurActuel(String token) {
        try {
            Claims claims = tokenConfig.parseToken(token);
            Long userId = Long.parseLong(claims.getSubject());

            return utilisateurRepository.findById(userId)
                    .map(user -> ResponseEntity.ok((Object) maskPassword(user))) // Cast de l'objet
                    .orElseGet(() -> errorResponse.createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable."));
        } catch (JwtException | IllegalArgumentException e) {
            logger.error("Erreur lors de la validation du token: {}", e.getMessage());
            return errorResponse.createErrorResponse(HttpStatus.UNAUTHORIZED, "Token invalide ou expiré.");
        }
    }

    public ResponseEntity<Object> ajouterUtilisateur(Utilisateur utilisateur) {
        logger.info("Ajout d'un nouvel utilisateur avec le login: {}", utilisateur.getLogin());

        if (utilisateur.getLogin() == null || utilisateur.getMdp() == null || utilisateur.getRole() == null) {
            logger.error("Échec de la validation - Champs requis manquants.");
            return errorResponse.createErrorResponse(HttpStatus.BAD_REQUEST, "Les champs login, mot de passe et role sont obligatoires.");
        }

        if (utilisateurRepository.findByLogin(utilisateur.getLogin()).isPresent()) {
            logger.error("Échec - Un utilisateur avec le login {} existe déjà.", utilisateur.getLogin());
            return errorResponse.createErrorResponse(HttpStatus.CONFLICT, "Un utilisateur avec ce login existe déjà.");
        }

        utilisateur.setMdp(passwordEncoder.encode(utilisateur.getMdp()));
        logger.info("Mot de passe haché pour le login: {}", utilisateur.getLogin());

        Utilisateur savedUser = utilisateurRepository.save(utilisateur);
        logger.info("Utilisateur ajouté avec succès: ID = {}", savedUser.getIdUser());

        Map<String, Object> response = Map.of(
                "idUser", savedUser.getIdUser(),
                "login", savedUser.getLogin(),
                "role", savedUser.getRole(),
                "message", "Utilisateur ajouté avec succès."
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    public ResponseEntity<Object> supprimerUtilisateur(Long id) {
        logger.info("Suppression de l'utilisateur avec l'ID: {}", id);

        if (!utilisateurRepository.existsById(id)) {
            logger.warn("Utilisateur avec l'ID {} introuvable", id);
            return errorResponse.createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
        }

        utilisateurRepository.deleteById(id);
        logger.info("Utilisateur avec l'ID {} supprimé avec succès.", id);

        Map<String, Object> response = Map.of(
                "status", HttpStatus.OK.value(),
                "message", "Utilisateur supprimé avec succès."
        );

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<Object> modifierUtilisateur(Long id, UtilisateurDto utilisateur) {
        logger.info("Modification de l'utilisateur avec l'ID: {}", id);

        Utilisateur utilisateurAMettreAJour = utilisateurRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Utilisateur avec l'ID {} introuvable", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
                });

        if (utilisateur == null || isEmptyUtilisateurDto(utilisateur)) {
            logger.warn("Aucun champ valide fourni pour la modification de l'utilisateur avec l'ID {}", id);
            return errorResponse.createErrorResponse(HttpStatus.BAD_REQUEST, "Aucun champ valide fourni pour la mise à jour.");
        }

        updateUtilisateurFields(utilisateurAMettreAJour, utilisateur);
        utilisateurRepository.save(utilisateurAMettreAJour);
        logger.info("Utilisateur avec l'ID {} modifié avec succès", id);

        return ResponseEntity.ok(maskPassword(utilisateurAMettreAJour));
    }

    private boolean isEmptyUtilisateurDto(UtilisateurDto utilisateur) {
        return utilisateur.getLogin() == null &&
                (utilisateur.getMdp() == null || utilisateur.getMdp().isBlank()) &&
                utilisateur.getRole() == null &&
                utilisateur.getNom() == null &&
                utilisateur.getPrenom() == null;
    }

    private void updateUtilisateurFields(Utilisateur utilisateurAMettreAJour, UtilisateurDto utilisateur) {
        if (utilisateur.getLogin() != null) {
            utilisateurAMettreAJour.setLogin(utilisateur.getLogin());
        }
        if (utilisateur.getMdp() != null && !utilisateur.getMdp().isBlank()) {
            utilisateurAMettreAJour.setMdp(passwordEncoder.encode(utilisateur.getMdp()));
        }
        if (utilisateur.getRole() != null) {
            utilisateurAMettreAJour.setRole(utilisateur.getRole());
        }
        if (utilisateur.getNom() != null) {
            utilisateurAMettreAJour.setNom(utilisateur.getNom());
        }
        if (utilisateur.getPrenom() != null) {
            utilisateurAMettreAJour.setPrenom(utilisateur.getPrenom());
        }
    }
}
