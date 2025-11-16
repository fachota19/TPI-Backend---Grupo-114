package ar.edu.utn.frc.backend.grupo114.gateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Slf4j
@Component
public class CorrelationIdFilter implements GlobalFilter, Ordered {

    private static final String CORRELATION_ID_HEADER = "X-Correlation-Id";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {

        String correlationId = UUID.randomUUID().toString();

        // Agregar header al response
        ServerHttpResponse response = exchange.getResponse();
        response.getHeaders().add(CORRELATION_ID_HEADER, correlationId);

        // Log de request
        log.info("[Gateway] {} {} CID={}",
                exchange.getRequest().getMethod(),
                exchange.getRequest().getURI(),
                correlationId);

        // Continuar y loguear respuesta al terminar
        return chain.filter(exchange).doOnSuccess(done ->
                log.info("[Response] {} CID={}",
                        response.getStatusCode(),
                        correlationId)
        );
    }

    @Override
    public int getOrder() {
        return -1; // se ejecuta primero
    }
}
