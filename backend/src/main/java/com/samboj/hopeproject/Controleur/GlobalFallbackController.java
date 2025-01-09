package com.samboj.hopeproject.Controleur;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GlobalFallbackController {

    @RequestMapping("/**")
    public ResponseEntity<String> handleUnknownRoutes() {
        return ResponseEntity.status(404).body("Route non trouvée. Vérifiez l'URL.");
    }
}
