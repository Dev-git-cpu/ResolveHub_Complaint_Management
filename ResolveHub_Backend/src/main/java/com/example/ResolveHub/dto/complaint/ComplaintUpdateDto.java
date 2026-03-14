package com.example.ResolveHub.dto.complaint;

import com.example.ResolveHub.Enums.ComplaintCategory;
import com.example.ResolveHub.Enums.Status;
import jdk.jfr.Category;
import lombok.Data;

@Data
public class ComplaintUpdateDto {
    private Status status;
    private String adminResponse;
}
