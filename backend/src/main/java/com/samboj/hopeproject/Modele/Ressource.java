package com.samboj.hopeproject.Modele;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
public class Ressource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre est obligatoire.")
    @Size(max = 255, message = "Le titre ne doit pas dépasser 255 caractères.")
    private String titre;

    @NotBlank(message = "Le domaine est obligatoire.")
    @Size(max = 255, message = "Le domaine ne doit pas dépasser 255 caractères.")
    private String domaine;

    @NotBlank(message = "Une description simple est obligatoire.")
    @Size(max = 2000, message = "La description simple ne doit pas dépasser 2000 caractères.")
    private String descriptionSimple;

    @Size(max = 3000, message = "La description détaillée ne doit pas dépasser 3000 caractères.")
    private String descriptionDetaillee;

    @Size(max = 1000, message = "Le champ 'Acces' ne doit pas dépasser 1000 caractères.")
    private String acces;

    @NotBlank(message = "Le lien est obligatoire.")
    @Size(max = 500, message = "Le lien ne doit pas dépasser 500 caractères.")
    private String lien;

    private int limiteFeedBack = 5;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private Status status = Status.PROPOSE;

    private LocalDateTime dateCreation = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        this.dateDerniereModification = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.dateDerniereModification = LocalDateTime.now();
    }

    private LocalDateTime dateDerniereModification;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public enum Status {
        VALIDE, PROPOSE, REJETE
    }

    // Constructeurs
    public Ressource() {}

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
