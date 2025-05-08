package com.example.auth_service.config;

import com.example.auth_service.logging.LoggingInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoggingInterceptor loggingInterceptor;

    @Value("${enable.request.logging:false}") // Read from application.properties
    private boolean enableLogging;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        if (enableLogging) {
            registry.addInterceptor(loggingInterceptor);
            System.out.println("Request logging is ENABLED");
        } else {
            System.out.println("Request logging is DISABLED");
        }
    }
}
