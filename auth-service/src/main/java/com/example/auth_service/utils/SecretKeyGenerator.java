package com.example.auth_service.utils;

// NOTE: THIS IS A MANUAL IMPLEMENTATION OF THE SECRET KEY GENER
// IT IS NOT USED IN THE PROJECT, BUT IT CAN BE USED TO GENERATE A SECRET KEY FOR THE JWT TOKEN
// THE GENERATED SECRET KEY CAN BE USED IN THE .ENV FILE in the ROOT REPO

import io.jsonwebtoken.security.Keys;
import java.util.Base64;
import java.security.Key;

public class SecretKeyGenerator {
    public static void main(String[] args) {
        Key key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
        String encodedKey = Base64.getEncoder().encodeToString(key.getEncoded());
        System.out.println("JWT_SECRET = " + encodedKey);
    }
}
