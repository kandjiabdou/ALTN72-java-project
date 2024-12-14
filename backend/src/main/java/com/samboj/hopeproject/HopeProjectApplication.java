package com.samboj.hopeproject;

import com.samboj.hopeproject.Service.UtilisateurService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HopeProjectApplication {
    public static final Logger LOGGER = LoggerFactory.getLogger(UtilisateurService.class);
    public static void main(String[] args) {
        SpringApplication.run(HopeProjectApplication.class, args);
    }

}
