package ar.edu.utn.frc.backend.grupo114.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)  // API REST → sin CSRF
                .authorizeExchange(auth -> auth
                        .pathMatchers("/actuator/**").permitAll()  // útil para debug
                        .anyExchange().authenticated()             // todo lo demás requiere JWT
                )
                .oauth2ResourceServer(oauth ->
                        oauth.jwt(Customizer.withDefaults())       // Validación de JWT
                )
                .build();
    }
}
