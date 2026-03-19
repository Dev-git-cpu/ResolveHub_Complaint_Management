package com.example.ResolveHub.service.impl;

import com.example.ResolveHub.Enums.Status;
import com.example.ResolveHub.dto.complaint.ComplaintRequest;
import com.example.ResolveHub.dto.complaint.ComplaintResponse;
import com.example.ResolveHub.entity.Complaint;
import com.example.ResolveHub.entity.User;
import com.example.ResolveHub.exception.ResourceNotFoundException;
import com.example.ResolveHub.repository.ComplaintRepository;
import com.example.ResolveHub.repository.UserRepository;
import com.example.ResolveHub.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final UserRepository userRepository;
    private final ComplaintRepository complaintRepository;

    @Override
    public ComplaintResponse createComplaint(Long userId, ComplaintRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User not Found"));

        Complaint complaint = new Complaint();

       complaint.setCategory(request.getCategory());
       complaint.setTitle(request.getTitle());
       complaint.setDescription(request.getDescription());
       complaint.setStatus(Status.SUBMITTED);
       complaint.setCreatedAt(LocalDateTime.now());
       complaint.setUpdatedAt(LocalDateTime.now());
       complaint.setUser(user);

       complaintRepository.save(complaint);


        return mapToResponse(complaint);
    }

    @Override
    public List<ComplaintResponse> getUserComplaints(Long userId) {

        List<Complaint> complaints = complaintRepository.findByUserId(userId);

        return complaints.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ComplaintResponse getComplaintById(Long complaintId) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(()-> new ResourceNotFoundException("Complaint Not Found"));
        return mapToResponse(complaint);
    }
    private ComplaintResponse mapToResponse(Complaint complaint){

        ComplaintResponse response = new ComplaintResponse();

        response.setId(complaint.getId());
        response.setName((complaint.getUser().getName()));
        response.setCategory(complaint.getCategory());
        response.setTitle(complaint.getTitle());
        response.setDescription(complaint.getDescription());
        response.setStatus(complaint.getStatus());
        response.setAdminResponse(complaint.getAdminResponse());
        response.setCreatedAt(complaint.getCreatedAt());
        response.setUpdatedAt(complaint.getUpdatedAt());


        return response;
    }
}
