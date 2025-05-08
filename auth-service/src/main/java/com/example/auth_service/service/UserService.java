package com.example.auth_service.service;

import com.example.auth_service.request.UserLoginRequest;
import com.example.auth_service.model.User;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.security.JwtUtil;
import com.example.auth_service.security.PasswordHasher;
import com.example.auth_service.request.SignupRequest;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, PasswordHasher passwordHasher, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtUtil = jwtUtil;
    }
    //login
    public String login(UserLoginRequest userLoginRequest) {
        Optional<User> user = userRepository.findByEmail(userLoginRequest.getEmail());

        if (user.isPresent() && passwordHasher.verifyPassword(userLoginRequest.getPassword(), user.get().getPasswordHash())) {
            return jwtUtil.generateToken(user.get().getEmail()); // ✅ Return JWT Token
        } else {
            return "Invalid credentials";
        }
    }
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    // Signup Method
    public String createUser(SignupRequest userSignupDTO) {
        // Check if email already exists
        if (userRepository.existsByEmail(userSignupDTO.getEmail())) {
            return "Email is already in use";
        }

        // Create a new User object
        User newUser = new User();
        newUser.setName(userSignupDTO.getName());
        newUser.setEmail(userSignupDTO.getEmail());
        newUser.setPasswordHash(passwordHasher.hashPassword(userSignupDTO.getPassword()));

        userRepository.save(newUser);
        return "User created successfully!";
    }

    
}
