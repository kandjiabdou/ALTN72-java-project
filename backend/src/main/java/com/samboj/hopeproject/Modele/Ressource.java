package com.samboj.hopeproject.Modele;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Ressource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire.")
    private String titre;

    @NotBlank(message = "Le domaine est obligatoire.")
    private String domaine;

    @NotBlank(message = "Une description simple est obligatoire.")
    private String descriptionSimple;

    @Column(columnDefinition = "TEXT")
    private String descriptionDetaillee;

    @Column(columnDefinition = "TEXT")
    private String acces;

    @NotBlank(message = "Le lien est obligatoire.")
    private String lien;

    private int limiteFeedBack = 5;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PROPOSE;

    private LocalDateTime dateCreation = LocalDateTime.now();

    private LocalDateTime dateDerniereModification;

    public enum Status {
        VALIDE, PROPOSE, REJETE
    }

    // Constructeurs
    public Ressource() {}

    public Ressource(String titre, String domaine, String descriptionSimple, String descriptionDetaillee, String lien, int limiteFeedBack, Status status) {
        this.titre = titre;
        this.domaine = domaine;
        this.descriptionSimple = descriptionSimple;
        this.descriptionDetaillee = descriptionDetaillee;
        this.lien = lien;
        this.limiteFeedBack = limiteFeedBack;
        this.status = status;
        this.dateCreation = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getDescriptionSimple() {
        return descriptionSimple;
    }

    public void setDescriptionSimple(String descriptionSimple) {
        this.descriptionSimple = descriptionSimple;
    }

    public String getAcces() {
        return acces;
    }

    public void setAcces(String acces) {
        this.acces = acces;
    }

    public String getDescriptionDetaillee() {
        return descriptionDetaillee;
    }

    public void setDescriptionDetaillee(String descriptionDetaillee) {
        this.descriptionDetaillee = descriptionDetaillee;
    }

    public String getLien() {
        return lien;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public int getLimiteFeedBack() {
        return limiteFeedBack;
    }

    public void setLimiteFeedBack(int limiteFeedBack) {
        this.limiteFeedBack = limiteFeedBack;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public LocalDateTime getDateDerniereModification() {
        return dateDerniereModification;
    }

    public void setDateDerniereModification(LocalDateTime dateDerniereModification) {
        this.dateDerniereModification = dateDerniereModification;
    }
}
