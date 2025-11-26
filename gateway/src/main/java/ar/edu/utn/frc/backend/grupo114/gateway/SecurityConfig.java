package ar.edu.utn.frc.backend.grupo114.gateway; // ⚠️ Asegúrate que el package sea el del Gateway

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            // ESTA LÍNEA SOLUCIONA TU ERROR 403 EN POSTMAN
            .csrf(ServerHttpSecurity.CsrfSpec::disable)
            
            .authorizeExchange(exchanges -> exchanges
                // Permite ver actuator si lo necesitas
                .pathMatchers("/actuator/**").permitAll()
                // Todo lo demás requiere estar logueado (JWT válido)
                .anyExchange().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(org.springframework.security.config.Customizer.withDefaults()));

        return http.build();
    }
}