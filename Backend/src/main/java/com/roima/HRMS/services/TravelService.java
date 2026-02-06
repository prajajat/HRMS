package com.roima.HRMS.services;

import com.roima.HRMS.dtos.responce.TravelDetailResponceDTO;
import com.roima.HRMS.entites.TravelDetail;
import com.roima.HRMS.repos.TravelRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Service
public class TravelService {
    private final TravelRepository travelRepository;

    @Autowired
    private ModelMapper modelMapper;

    public TravelService(TravelRepository travelRepository)
    {
        this.travelRepository=travelRepository;
    }

    public List<TravelDetailResponceDTO> getAllTravelDetails()
    {
       List<TravelDetail> travelDetailList=travelRepository.findAll();
       List<TravelDetailResponceDTO>  travelDetailDTOList=travelDetailList.stream()
                .map(a -> modelMapper.map(a, TravelDetailResponceDTO.class))
                .collect(Collectors.toList());
        return travelDetailDTOList;
    }

}
