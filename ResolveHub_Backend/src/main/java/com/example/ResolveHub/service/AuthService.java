package com.example.ResolveHub.service;

import com.example.ResolveHub.dto.auth.LoginRequest;
import com.example.ResolveHub.dto.auth.LoginResponse;
import com.example.ResolveHub.dto.auth.RegisterRequest;
import com.example.ResolveHub.dto.auth.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}
