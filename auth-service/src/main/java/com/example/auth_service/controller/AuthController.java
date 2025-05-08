package com.example.auth_service.controller;

import com.example.auth_service.request.SignupRequest;
import com.example.auth_service.request.UserLoginRequest;
import com.example.auth_service.response.LoginResponseDTO;
import com.example.auth_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService authService;

    public AuthController(UserService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserLoginRequest userLoginRequest) {
        String token = authService.login(userLoginRequest);

        if (token.equals("Invalid credentials")) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        // Get username (optional: you could return it from service but let's query it)
        var user = authService.getUserByEmail(userLoginRequest.getEmail());  // We'll add this method
        if (user.isEmpty()) {
            return ResponseEntity.status(500).body("User not found after login");
        }

        return ResponseEntity.ok(new LoginResponseDTO(token, user.get().getName()));
    }


    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest userSignupDTO) {
        String result = authService.createUser(userSignupDTO);
        if ("User created successfully!".equals(result)) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }
}
