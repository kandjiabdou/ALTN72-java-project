package com.samboj.hopeproject.Exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ErrorResponse {

    private static final Logger logger = LoggerFactory.getLogger(ErrorResponse.class);

    /**
     * Crée une réponse d'erreur standardisée.
     *
     * @param status  le statut HTTP à retourner.
     * @param message le message d'erreur.
     * @return une instance de ResponseEntity avec le statut et le message d'erreur.
     */
    public ResponseEntity<Object> createErrorResponse(HttpStatus status, String message) {
        logger.error("Erreur - Statut: {}, Message: {}", status.value(), message);
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }
}
