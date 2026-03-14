package com.example.ResolveHub.controller;

import com.example.ResolveHub.dto.complaint.ComplaintRequest;
import com.example.ResolveHub.dto.complaint.ComplaintResponse;
import com.example.ResolveHub.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5000")
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping("/{userId}")
    public ComplaintResponse createComplaint(
            @PathVariable Long userId,
            @RequestBody ComplaintRequest request){
return complaintService.createComplaint(userId,request);
    }

    @GetMapping("/user/{userId}")
    public List<ComplaintResponse> getUserComplaints(@PathVariable Long userId){
return complaintService.getUserComplaints(userId);
    }

    @GetMapping("/{complaintId}")
    public ComplaintResponse getComplaintById(@PathVariable  Long complaintId){
        return complaintService.getComplaintById(complaintId);
    }
}
