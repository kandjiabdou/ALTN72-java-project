package com.samboj.hopeproject.Modele;

import jakarta.persistence.*;

@Entity
public class Ressource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String domaine;
    private String descriptionSimple;
    private String descriptionDetaillee;
    private String lien;
    private int limiteFeedBack = 5;

    @Enumerated(EnumType.STRING)
    private Status status = Status.VALIDE;

    public enum Status {
        VALIDE, PROPOSE, REJETE
    }
}
