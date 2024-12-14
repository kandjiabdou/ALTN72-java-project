package com.samboj.hopeproject.Modele;

import jakarta.validation.constraints.NotNull;

import jakarta.persistence.*;


@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    private String prenom;
    private String nom;

    @NotNull(message = "Le champ 'login' est obligatoire.")
    private String login;

    @NotNull(message = "Le champ 'mdp' est obligatoire.")
    private String mdp;

    @Enumerated(EnumType.STRING) @NotNull(message = "Le champ 'role' est obligatoire.")
    private Role role;

    public enum Role {
        ADMIN, PROF, ETUDIANT
    }

    // Getters et Setters

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
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

