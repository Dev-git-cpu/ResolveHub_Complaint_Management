package com.example.ResolveHub.security;

import com.example.ResolveHub.Enums.Role;
import com.example.ResolveHub.entity.User;
import com.example.ResolveHub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if(userRepository.findByEmail("admin@resolvehub.com").isEmpty()){

            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@resolvehub.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setCreatedAt(LocalDateTime.now());

            userRepository.save(admin);

            System.out.println("Admin user created!");
        }
    }
}
