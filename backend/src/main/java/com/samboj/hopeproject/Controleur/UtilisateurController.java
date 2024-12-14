package com.samboj.hopeproject.Controleur;

import com.samboj.hopeproject.HopeProjectApplication;
import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.Map;


@RestController
@RequestMapping("/api/utilisateur")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<?> recupererTousLesUtilisateurs() {
        HopeProjectApplication.LOGGER.info("Récupération de tous les utilisateurs");
        return utilisateurService.recupererTousLesUtilisateurs();
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
