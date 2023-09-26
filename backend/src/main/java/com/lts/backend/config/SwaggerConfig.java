package com.lts.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

	private static final String SCHEME_NAME = "bearerAuth";
	private static final String SCHEME = "bearer";

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI().components(new Components().addSecuritySchemes(SCHEME_NAME, createSecurityScheme()))
				.addSecurityItem(new SecurityRequirement().addList(SCHEME_NAME));
	}

	private SecurityScheme createSecurityScheme() {
		return new SecurityScheme().name(SCHEME_NAME).type(SecurityScheme.Type.HTTP).scheme(SCHEME);
	}

}
