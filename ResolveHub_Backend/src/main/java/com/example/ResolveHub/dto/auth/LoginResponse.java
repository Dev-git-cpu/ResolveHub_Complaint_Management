package com.example.ResolveHub.dto.auth;

import com.example.ResolveHub.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long id;
    private String name;
    private String token;
    private Role role;
    private String message;


}
