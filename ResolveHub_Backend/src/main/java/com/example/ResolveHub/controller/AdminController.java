package com.example.ResolveHub.controller;

import com.example.ResolveHub.dto.complaint.ComplaintResponse;
import com.example.ResolveHub.dto.complaint.ComplaintUpdateDto;
import com.example.ResolveHub.dto.complaint.ComplaintUpdateResponse;
import com.example.ResolveHub.entity.User;
import com.example.ResolveHub.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/complaints")
    public Page<ComplaintResponse> getAllComplaints(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return adminService.getAllComplaints(page, size);
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return adminService.getAllUsers();
    }

    @GetMapping("/complaints/{id}")
    public ComplaintResponse getComplaintById(@PathVariable Long complaintId){
        return adminService.getComplaintById(complaintId);
    }

    @PutMapping("/complaints/{id}")
    public ComplaintUpdateResponse updateComplaint(@PathVariable("id") Long complainId,
                                                   @RequestBody ComplaintUpdateDto updateDto){
        return adminService.updateComplaint(complainId,updateDto);
    }

}
