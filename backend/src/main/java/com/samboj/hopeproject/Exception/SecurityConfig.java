package com.samboj.hopeproject.Exception;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Désactiver l'authentification pour les endpoints publics
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/**").permitAll() // Permettre l'accès aux routes API sans authentification
                        .anyRequest().authenticated() // Toutes les autres routes nécessitent une authentification
                )
                // Désactiver la protection CSRF pour simplifier (optionnel, dépend des besoins)
                .csrf().disable();

        return http.build();
    }
}
