package com.example.ResolveHub.service.impl;

import com.example.ResolveHub.dto.complaint.ComplaintResponse;
import com.example.ResolveHub.dto.complaint.ComplaintUpdateDto;
import com.example.ResolveHub.dto.complaint.ComplaintUpdateResponse;
import com.example.ResolveHub.entity.Complaint;
import com.example.ResolveHub.entity.User;
import com.example.ResolveHub.exception.ResourceNotFoundException;
import com.example.ResolveHub.repository.ComplaintRepository;
import com.example.ResolveHub.repository.UserRepository;
import com.example.ResolveHub.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;


    @Override
    public Page<ComplaintResponse> getAllComplaints(int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Complaint> complaints = complaintRepository.findAll(pageable);

        return complaints.map(this::mapToResponse);

    }

    @Override
    public ComplaintResponse getComplaintById(Long complaintId) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(()-> new ResourceNotFoundException("Complaint Not Found"));
        return mapToResponse(complaint);
    }

    @Override
    public ComplaintUpdateResponse updateComplaint(Long complaintId, ComplaintUpdateDto updateDto) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(()-> new ResourceNotFoundException("Complaint Not Found"));

        complaint.setStatus(updateDto.getStatus());
        complaint.setAdminResponse(updateDto.getAdminResponse());
        complaint.setUpdatedAt(LocalDateTime.now());

        complaintRepository.save(complaint);

        return mapToUpdateResponse(complaint);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    private ComplaintResponse mapToResponse(Complaint complaint){
        ComplaintResponse response = new ComplaintResponse();

        response.setId(complaint.getId());
        response.setCategory(complaint.getCategory());
        response.setTitle(complaint.getTitle());
        response.setDescription(complaint.getDescription());
        response.setStatus(complaint.getStatus());
        response.setAdminResponse(complaint.getAdminResponse());
        response.setUpdatedAt(complaint.getUpdatedAt());
        return response;
    }
    private ComplaintUpdateResponse mapToUpdateResponse(Complaint complaint){
        ComplaintUpdateResponse response = new ComplaintUpdateResponse();

        response.setId(complaint.getId());
        response.setCategory(complaint.getCategory());
        response.setTitle(complaint.getTitle());
        response.setDescription(complaint.getDescription());
        response.setStatus(complaint.getStatus());
        response.setAdminResponse(complaint.getAdminResponse());
        response.setUpdatedAt(complaint.getUpdatedAt());
        return response;
    }
}
