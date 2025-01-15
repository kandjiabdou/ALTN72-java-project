package com.samboj.hopeproject.Modele;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;


@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser; // Renomme pour plus de cohérence

    @NotBlank(message = "Le prénom est obligatoire.")
    @Size(max = 50, message = "Le prénom ne doit pas dépasser 50 caractères.")
    private String prenom;

    @NotBlank(message = "Le nom est obligatoire.")
    @Size(max = 50, message = "Le nom ne doit pas dépasser 50 caractères.")
    private String nom;

    @NotNull(message = "Le champ 'login' est obligatoire.")
    @Column(unique = true, length = 100) // Pour garantir unicite et limitation de taille
    private String login;

    @NotNull(message = "Le champ 'mdp' est obligatoire.")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères.")
    private String mdp;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le rôle est obligatoire.")
    @Column(length = 20)
    private Role role;

    public enum Role {
        ADMIN, PROF, ETUDIANT
    }

    // Getters et Setters

    public Long getIdUser() {
        return idUser;
    }

    public void setId(Long idUser) {
        this.idUser = idUser;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}