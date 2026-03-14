package com.example.ResolveHub.dto.complaint;

import com.example.ResolveHub.Enums.ComplaintCategory;
import lombok.Data;

@Data
public class ComplaintRequest {
    private ComplaintCategory category;
    private String title;
    private String description;


}
