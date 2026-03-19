package com.example.ResolveHub.service;

import com.example.ResolveHub.dto.complaint.ComplaintResponse;
import com.example.ResolveHub.dto.complaint.ComplaintUpdateDto;
import com.example.ResolveHub.dto.complaint.ComplaintUpdateResponse;
import com.example.ResolveHub.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdminService {
    Page<ComplaintResponse> getAllComplaints(int page, int size);

    ComplaintResponse getComplaintById(Long complaintId);

    ComplaintUpdateResponse updateComplaint(Long complaintId, ComplaintUpdateDto updateDto);

    public List<User> getAllUsers();
}
