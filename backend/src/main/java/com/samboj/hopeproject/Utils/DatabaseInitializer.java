package com.samboj.hopeproject.Utils;

import com.samboj.hopeproject.Modele.Ressource;
import com.samboj.hopeproject.Modele.Utilisateur;
import com.samboj.hopeproject.Repository.RessourceRepository;
import com.samboj.hopeproject.Repository.UtilisateurRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.time.LocalDateTime;

import static com.samboj.hopeproject.Modele.Utilisateur.Role.*;

@Component
public class DatabaseInitializer {

    @Autowired
    private RessourceRepository ressourceRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @PostConstruct
    public void initDatabase() {
        try {
            // Charger et lire le fichier Excel
            InputStream inputStream = getClass().getResourceAsStream("/ressources.xlsx");
            Workbook workbook = new XSSFWorkbook(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Ignorer la ligne d'entête

                Ressource ressource = new Ressource();
                ressource.setTitre(getCellValue(row.getCell(0)));
                ressource.setDomaine(getCellValue(row.getCell(1)));
                ressource.setDescriptionSimple(getCellValue(row.getCell(2)));
                ressource.setDescriptionDetaillee(getCellValue(row.getCell(3)));
                ressource.setLien(getCellValue(row.getCell(4)));
                ressource.setAcces(getCellValue(row.getCell(5)));
                ressource.setDateCreation(LocalDateTime.now());
                ressource.setDateDerniereModification(LocalDateTime.now());
                ressource.setLimiteFeedBack(5);
                ressource.setStatus(Ressource.Status.VALIDE);

                // Sauvegarder dans la base de données
                ressourceRepository.save(ressource);
            }

            workbook.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Création des utilisateurs
        if (utilisateurRepository.count() == 0) { // Éviter de recréer si déjà existants
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            Utilisateur admin = new Utilisateur();
            admin.setLogin("admin");
            admin.setPrenom("User-a");
            admin.setNom("ADM");
            admin.setMdp(passwordEncoder.encode("admin123"));
            admin.setRole(ADMIN);
            utilisateurRepository.save(admin);

            Utilisateur prof = new Utilisateur();
            prof.setLogin("prof");
            prof.setPrenom("User-p");
            prof.setNom("PROF");
            prof.setMdp(passwordEncoder.encode("prof123"));
            prof.setRole(PROF);
            utilisateurRepository.save(prof);

            Utilisateur etudiant = new Utilisateur();
            etudiant.setLogin("etudiant");
            etudiant.setPrenom("User-e");
            etudiant.setNom("ETUD");
            etudiant.setMdp(passwordEncoder.encode("etudiant123"));
            etudiant.setRole(ETUDIANT);
            utilisateurRepository.save(etudiant);

            System.out.println("Utilisateurs créés avec succès :");
            System.out.println("ADMIN : admin123");
            System.out.println("PROF : prof123");
            System.out.println("ETUDIANT : etudiant123");
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return null;
        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue();
        } else if (cell.getCellType() == CellType.NUMERIC) {
            return String.valueOf(cell.getNumericCellValue());
        }
        return null;
    }
}
