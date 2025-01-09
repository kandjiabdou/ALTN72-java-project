package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.HopeProjectApplication;
import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<?> recupererTousLesUtilisateurs() {
        HopeProjectApplication.LOGGER.info("Récupération de tous les utilisateurs");
        return utilisateurService.recupererTousLesUtilisateurs();
    }

    @GetMapping("/me")
    public ResponseEntity<Object> recupererUtilisateurActuel(
            @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return utilisateurService.createErrorResponse(HttpStatus.UNAUTHORIZED, "Token manquant ou invalide.");
        }

        String token = authorizationHeader.substring(7); // Supprimer "Bearer " pour obtenir le token
        return utilisateurService.recupererUtilisateurActuel(token);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUtilisateurParId(@PathVariable Long id) {
        return utilisateurService.recupererUtilisateurParId(id);
    }

    @PostMapping
    public ResponseEntity<?> ajouterUtilisateur(@Valid @RequestBody Utilisateur utilisateur) {
        HopeProjectApplication.LOGGER.info("Ajout d'un utilisateur : {}", utilisateur);
        return utilisateurService.ajouterUtilisateur(utilisateur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> modifierUtilisateur(@PathVariable Long id, @Valid @RequestBody Utilisateur utilisateur) {
        return utilisateurService.modifierUtilisateur(id, utilisateur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerUtilisateur(@PathVariable Long id) {
        HopeProjectApplication.LOGGER.info("Suppression d'un utilisateur avec ID : {}", id);
        return utilisateurService.supprimerUtilisateur(id);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credentials) {
        String login = credentials.get("login");
        String mdp = credentials.get("mdp");
        return utilisateurService.login(login, mdp);
    }
}