package com.samboj.hopeproject.Service;

import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Modele.UtilisateurDto;
import com.samboj.hopeproject.Repository.UtilisateurRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UtilisateurService {

    private static final Logger logger = LoggerFactory.getLogger(UtilisateurService.class);

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    private static final String SECRET_KEY = "z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==";

    public ResponseEntity<Object> createErrorResponse(HttpStatus status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }

    private Utilisateur maskPassword(Utilisateur utilisateur) {
        utilisateur.setMdp(null);
        return utilisateur;
    }

    public ResponseEntity<Object> login(String login, String mdp) {
        logger.info("Tentative de connexion pour le login: {}", login);

        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findByLogin(login);
        if (utilisateurOpt.isEmpty()) {
            logger.warn("Échec de connexion - Login introuvable: {}", login);
            return createErrorResponse(HttpStatus.UNAUTHORIZED, "Login ou mot de passe incorrect.");
        }

        Utilisateur utilisateur = utilisateurOpt.get();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        if (!passwordEncoder.matches(mdp, utilisateur.getMdp())) {
            logger.warn("Échec de connexion - Mot de passe incorrect pour le login: {}", login);
            return createErrorResponse(HttpStatus.UNAUTHORIZED, "Login ou mot de passe incorrect.");
        }

        // Génération du token JWT
        String token = Jwts.builder()
                .setSubject(utilisateur.getIdUser().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 heure
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

        logger.info("Connexion réussie pour le login: {}", login);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Connexion réussie.");

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<List<Utilisateur>> recupererTousLesUtilisateurs() {
        logger.info("Récupération de tous les utilisateurs");
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll()
                .stream()
                .map(this::maskPassword)
                .collect(Collectors.toList());
        return ResponseEntity.ok(utilisateurs);
    }

    public ResponseEntity<Object> recupererUtilisateurParId(Long id) {
        logger.info("Recherche d'un utilisateur avec l'ID: {}", id);
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
        if (utilisateur.isPresent()) {
            return ResponseEntity.ok(maskPassword(utilisateur.get()));
        } else {
            logger.warn("Utilisateur avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
        }
    }

    public ResponseEntity<Object> recupererUtilisateurActuel(String token) {
        try {
            // Décoder le token pour récupérer les informations
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();

            Long userId = Long.parseLong(claims.getSubject());
            Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findById(userId);

            if (utilisateurOpt.isPresent()) {
                return ResponseEntity.ok(maskPassword(utilisateurOpt.get()));
            } else {
                return createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable.");
            }
        } catch (JwtException | IllegalArgumentException e) {
            logger.error("Erreur lors de la validation du token: {}", e.getMessage());
            return createErrorResponse(HttpStatus.UNAUTHORIZED, "Token invalide ou expiré.");
        }
    }

    public ResponseEntity<Object> ajouterUtilisateur(Utilisateur utilisateur) {
        logger.info("Ajout d'un nouvel utilisateur avec le login: {}", utilisateur.getLogin());

        // Vérifier les champs obligatoires
        if (utilisateur.getLogin() == null || utilisateur.getMdp() == null || utilisateur.getRole() == null) {
            logger.error("Échec de la validation - Champs requis manquants.");
            return createErrorResponse(HttpStatus.BAD_REQUEST, "Les champs login, mot de passe et role sont obligatoires.");
        }

        // Vérifier l'unicité du login
        if (utilisateurRepository.findByLogin(utilisateur.getLogin()).isPresent()) {
            logger.error("Échec - Un utilisateur avec le login {} existe déjà.", utilisateur.getLogin());
            return createErrorResponse(HttpStatus.CONFLICT, "Un utilisateur avec ce login existe déjà.");
        }

        // Hacher le mot de passe
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        utilisateur.setMdp(passwordEncoder.encode(utilisateur.getMdp()));
        logger.info("Mot de passe haché pour le login: {}", utilisateur.getLogin());

        // Sauvegarder l'utilisateur
        Utilisateur savedUser = utilisateurRepository.save(utilisateur);
        logger.info("Utilisateur ajouté avec succès: ID = {}", savedUser.getIdUser());

        // Préparer la réponse sans le mot de passe
        Map<String, Object> response = new HashMap<>();
        response.put("idUser", savedUser.getIdUser());
        response.put("login", savedUser.getLogin());
        response.put("role", savedUser.getRole());
        response.put("message", "Utilisateur ajouté avec succès.");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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

    public ResponseEntity<Object> modifierUtilisateur(Long id, UtilisateurDto utilisateur) {
        logger.info("Modification de l'utilisateur avec l'ID: {}", id);
        Optional<Utilisateur> utilisateurExistant = utilisateurRepository.findById(id);
        if (!utilisateurExistant.isPresent()) {
            logger.warn("Utilisateur avec l'ID {} introuvable", id);
            return createErrorResponse(HttpStatus.NOT_FOUND, "Utilisateur introuvable avec l'ID: " + id);
        }

        Utilisateur utilisateurAMettreAJour = utilisateurExistant.get();

        // Mise à jour des champs fournis dans le DTO
        if (utilisateur.getLogin() != null) {
            utilisateurAMettreAJour.setLogin(utilisateur.getLogin());
        }
        if (utilisateur.getMdp() != null && !utilisateur.getMdp().isBlank()) {
            // Hashage du mot de passe avant de le mettre à jour
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            utilisateurAMettreAJour.setMdp(passwordEncoder.encode(utilisateur.getMdp()));
        }
        if (utilisateur.getRole() != null) {
            utilisateurAMettreAJour.setRole(utilisateur.getRole());
        }

        // Enregistrement de l'utilisateur mis à jour dans la base de données
        Utilisateur utilisateurMisAJour = utilisateurRepository.save(utilisateurAMettreAJour);
        logger.info("Utilisateur avec l'ID {} modifié avec succès", id);

        // Retourne l'utilisateur mis à jour avec le mot de passe masqué
        return ResponseEntity.ok(maskPassword(utilisateurMisAJour));
    }
}