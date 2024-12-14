package com.samboj.hopeproject.Exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.http.converter.HttpMessageNotReadableException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Gérer les erreurs de désérialisation JSON
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleJsonParseError(HttpMessageNotReadableException ex) {
        logger.error("Erreur de désérialisation JSON: {}", ex.getMessage());

        // Extraire un message lisible si possible
        String message = ex.getMostSpecificCause() != null ? ex.getMostSpecificCause().getMessage() : ex.getMessage();

        return createErrorResponse(HttpStatus.BAD_REQUEST, "Erreur JSON : " + message);
    }

    // Gérer les erreurs d'arguments incorrects (ex. enum invalide)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Object> handleArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        logger.error("Type de paramètre incorrect: {}", ex.getMessage());
        String message = String.format("Le paramètre '%s' a une valeur incorrecte : '%s'. Attendu : %s",
                ex.getName(), ex.getValue(), ex.getRequiredType().getSimpleName());

        return createErrorResponse(HttpStatus.BAD_REQUEST, message);
    }

    // Gérer toutes les autres exceptions génériques
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex) {
        logger.error("Erreur inattendue: {}", ex.getMessage(), ex);
        return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Une erreur inattendue s'est produite.");
    }

    // Méthode utilitaire pour créer une réponse JSON
    private ResponseEntity<Object> createErrorResponse(HttpStatus status, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("message", message);
        return ResponseEntity.status(status).body(response);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Object> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.METHOD_NOT_ALLOWED.value());
        response.put("message", "La méthode HTTP utilisée n'est pas prise en charge pour cet endpoint.");
        response.put("details", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }
}
