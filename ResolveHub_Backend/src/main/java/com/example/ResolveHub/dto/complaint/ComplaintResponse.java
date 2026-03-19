package com.example.ResolveHub.dto.complaint;

import com.example.ResolveHub.Enums.ComplaintCategory;
import com.example.ResolveHub.Enums.Status;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintResponse {

    private Long id;
    private String name;
    private ComplaintCategory category;
    private String title;
    private String description;
    private Status status;
    private String adminResponse;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
