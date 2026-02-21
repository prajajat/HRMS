package com.roima.HRMS.services;


import com.roima.HRMS.dtos.response.JobResponseDTO;
import com.roima.HRMS.repos.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final ModelMapper modelMapper;
    public List<JobResponseDTO> getAllJobDetails()
    {
        return jobRepository.findAll().stream().map(
                j->modelMapper.map(j,JobResponseDTO.class)
        ).toList();
    }
}
