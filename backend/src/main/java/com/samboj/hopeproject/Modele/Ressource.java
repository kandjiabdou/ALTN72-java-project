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
    private int limiteFeedBack;
    private boolean status;
}
