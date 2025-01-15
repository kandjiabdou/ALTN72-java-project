package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.HopeProjectApplication;
import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Modele.UtilisateurDto;
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
        return utilisateurService.getAllUtilisateurs();
    }

    @GetMapping("/me")
    public ResponseEntity<Object> recupererUtilisateurActuel(@RequestHeader("Authorization") String authorizationHeader) {
        HopeProjectApplication.LOGGER.info("Récupération de l'utilisateur actuel");

        // Déplacement de la logique de validation dans le service ou un filtre
        if (!authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token manquant ou invalide.");
        }

        String token = authorizationHeader.substring(7);
        return utilisateurService.getUtilisateurActuel(token);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUtilisateurParId(@PathVariable Long id) {
        HopeProjectApplication.LOGGER.info("Récupération de l'utilisateur avec ID : {}", id);
        return utilisateurService.getUtilisateurById(id);
    }

    @PostMapping
    public ResponseEntity<?> ajouterUtilisateur(@Valid @RequestBody Utilisateur utilisateur) {
        HopeProjectApplication.LOGGER.info("Ajout d'un utilisateur : {}", utilisateur);
        return utilisateurService.ajouterUtilisateur(utilisateur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> modifierUtilisateur(@PathVariable Long id, @Valid @RequestBody UtilisateurDto utilisateurDto) {
        HopeProjectApplication.LOGGER.info("Modification de l'utilisateur avec ID : {}", id);
        return utilisateurService.modifierUtilisateur(id, utilisateurDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerUtilisateur(@PathVariable Long id) {
        HopeProjectApplication.LOGGER.info("Suppression de l'utilisateur avec ID : {}", id);
        return utilisateurService.supprimerUtilisateur(id);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credentials) {
        HopeProjectApplication.LOGGER.info("Tentative de connexion pour le login : {}", credentials.get("login"));
        return utilisateurService.login(credentials.get("login"), credentials.get("mdp"));
    }
}
