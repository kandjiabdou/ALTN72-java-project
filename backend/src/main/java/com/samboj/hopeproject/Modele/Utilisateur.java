package com.samboj.hopeproject.Modele;


import jakarta.persistence.*;

@Entity
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    private String prenom;
    private String nom;
    private String login;
    private String mdp;
    @Enumerated(EnumType.STRING)
    private Role role;

    public enum Role {
        ADMIN, PROF, ETUDIANT
    }
}
