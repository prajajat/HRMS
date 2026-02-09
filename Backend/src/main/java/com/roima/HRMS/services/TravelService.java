package com.roima.HRMS.services;

import com.roima.HRMS.dtos.responce.TravelDetailResponceDTO;
import com.roima.HRMS.entites.TravelDetail;
import com.roima.HRMS.repos.TravelDetailRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class TravelService {

    private final TravelDetailRepository travelDetailRepository;
    private final ModelMapper modelMapper;


    public List<TravelDetailResponceDTO> getAllTravelDetails()
    {
       List<TravelDetail> travelDetailList=travelDetailRepository.findAll();
       List<TravelDetailResponceDTO>  travelDetailDTOList = travelDetailList.stream()
                                                .map(a ->
                                                        modelMapper.map(a, TravelDetailResponceDTO.class)
                                                ).collect(Collectors.toList());
        return travelDetailDTOList;
    }



}
