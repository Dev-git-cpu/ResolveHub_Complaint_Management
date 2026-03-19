package com.example.ResolveHub.service.impl;

import com.example.ResolveHub.Enums.Role;
import com.example.ResolveHub.dto.auth.LoginRequest;
import com.example.ResolveHub.dto.auth.LoginResponse;
import com.example.ResolveHub.dto.auth.RegisterRequest;
import com.example.ResolveHub.dto.auth.RegisterResponse;
import com.example.ResolveHub.entity.User;
import com.example.ResolveHub.exception.ResourceNotFoundException;
import com.example.ResolveHub.repository.UserRepository;
import com.example.ResolveHub.security.JwtService;
import com.example.ResolveHub.service.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;


    @Override
    public RegisterResponse register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        return new RegisterResponse(user.getName(),
                "User registered successfully");
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

       User user = userRepository.findByEmail(request.getEmail())
               .orElseThrow(()-> new ResourceNotFoundException("User not found"));

//       if(!user.getPassword().equals(request.getPassword())){
//           throw new ResourceNotFoundException("Invalid Password");
//       }
        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                user.getId(),
                user.getName(),
                token,
                user.getRole(),
                "Login successfully"

        );
    }
}
