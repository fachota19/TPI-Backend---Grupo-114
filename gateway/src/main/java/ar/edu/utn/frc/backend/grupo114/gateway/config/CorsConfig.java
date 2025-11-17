package ar.edu.utn.frc.backend.grupo114.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {

        CorsConfiguration cors = new CorsConfiguration();

        // 🌐 Origen del frontend
        cors.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173"
        ));

        cors.setAllowCredentials(true);
        cors.setAllowedHeaders(Arrays.asList("*"));
        cors.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","DELETE","OPTIONS"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);

        return new CorsWebFilter(source);
    }
}
