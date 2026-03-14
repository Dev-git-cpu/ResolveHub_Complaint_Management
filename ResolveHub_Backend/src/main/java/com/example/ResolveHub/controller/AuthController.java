package com.example.ResolveHub.controller;

import com.example.ResolveHub.dto.auth.LoginRequest;
import com.example.ResolveHub.dto.auth.LoginResponse;
import com.example.ResolveHub.dto.auth.RegisterRequest;
import com.example.ResolveHub.dto.auth.RegisterResponse;
import com.example.ResolveHub.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

}
