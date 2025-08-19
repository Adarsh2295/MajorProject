package com.jobportal.job_portal.Configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.jobportal.job_portal.JWT.JwtAuthenticationEntryPoint;
import com.jobportal.job_portal.JWT.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint point;

    @Autowired
    private JwtAuthenticationFilter filter;

    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        // http.authorizeHttpRequests((req)->
        //     req.requestMatchers("/**").permitAll().anyRequest().permitAll());
        //     http.csrf(csrf->csrf.disable());
        //     return http.build();
        
        http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf-> csrf.disable())
        .authorizeRequests()
        .requestMatchers("/auth/login", "/auth/logout", "/users/register", "/users/verify-otp/**", "/users/send-otp/**").permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .exceptionHandling(ex-> ex.authenticationEntryPoint(point))
        .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
        
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Your React app's origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed methods
        configuration.setAllowedHeaders(Arrays.asList("*")); // Allowed headers
        configuration.setAllowCredentials(true); // Allow credentials (cookies) if needed
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply to all endpoints
        return source;
    }

}

