package com.example.ResolveHub.repository;

import com.example.ResolveHub.Enums.Status;
import com.example.ResolveHub.entity.Complaint;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint,Long> {

    List<Complaint> findByUserId(Long userId);

    List<Complaint> findByStatus(Status status);

}
