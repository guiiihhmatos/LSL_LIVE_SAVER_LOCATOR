package com.its.backend.config;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.lts.backend.models.Motorista;

@Service
public class TokenService {
	
	@Value("${api.security.token.secret}")
	private String secret;

	public String genToken(Motorista motorista) {
		
		try {
			
			Algorithm algorithm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("auth-api")
					.withSubject(motorista.getLogin())
					.withExpiresAt(genExpirationDate())
					.sign(algorithm);
			
			return token;
			
		} catch (JWTCreationException exception) {
			throw new RuntimeException("Error while generating token", exception);
		}
	}
	
	public String validateToken(String token) {
		
		try {
			
			Algorithm algorithm = Algorithm.HMAC256(secret);
			return JWT.require(algorithm)
					.withIssuer("auth-api")
					.build()
					.verify(token)
					.getSubject();
					
		} catch (JWTVerificationException exception) {
			return "";
		}
		
	}
	
	private Instant genExpirationDate() {
		
		return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-03:00"));
	}
}