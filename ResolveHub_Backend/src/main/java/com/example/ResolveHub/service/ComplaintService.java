package com.example.ResolveHub.service;

import com.example.ResolveHub.dto.complaint.ComplaintRequest;
import com.example.ResolveHub.dto.complaint.ComplaintResponse;

import java.util.List;

public interface ComplaintService {

    ComplaintResponse createComplaint(Long userId, ComplaintRequest request);

    List<ComplaintResponse> getUserComplaints(Long userId);

    ComplaintResponse getComplaintById(Long complaintId);
}
