package com.roima.HRMS.services;

import com.roima.HRMS.dtos.request.TravelDetailDTO;
import com.roima.HRMS.dtos.responce.BasicResponce;
import com.roima.HRMS.dtos.request.AddEmployeeDTO;
import com.roima.HRMS.dtos.responce.TravelDetailResponceDTO;
import com.roima.HRMS.entites.TravelDetail;
import com.roima.HRMS.entites.User;
import com.roima.HRMS.repos.TravelDetailRepository;
import com.roima.HRMS.repos.UserRepository;
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
    private final ModelMapper modelMapper ;
    private final UserRepository userRepo;

    public List<TravelDetailResponceDTO> getAllTravelDetails()
    {
       List<TravelDetail> travelDetailList=travelDetailRepository.findAll();
        return  travelDetailList.stream().map(a ->
                                                        modelMapper.map(a, TravelDetailResponceDTO.class)
                                                ).collect(Collectors.toList());
    }

    public TravelDetailResponceDTO getTravelDetails(Long id)
    {
       return modelMapper.map( findTravelDetailById(id),TravelDetailResponceDTO.class);
    }


    public BasicResponce createTravelDetail(TravelDetailDTO dto)
    {
        User createdBy=findUserById(dto.getCreadtedBy());
        TravelDetail travelDetail=modelMapper.map(dto,TravelDetail.class);
        travelDetail.setCreadtedBy(createdBy);
        travelDetailRepository.save(travelDetail);
        return new BasicResponce("created successfully");
    }
    public BasicResponce updateTravelDetails(Long id,TravelDetailDTO dto) {
        User createdBy=findUserById(dto.getCreadtedBy());
        TravelDetail travelDetail= findTravelDetailById(id);
        travelDetail.setCreadtedBy(createdBy);
        modelMapper.map(dto,travelDetail);
        travelDetailRepository.save(travelDetail);
        return new BasicResponce("updated  sucessfully");
    }

    public BasicResponce deleteTravelDetails(Long id) {
        travelDetailRepository.deleteById(id);
        return new BasicResponce("deleted sucessfully");
    }

    public BasicResponce addEmployees(AddEmployeeDTO dto)
    {
        TravelDetail travelDetail= findTravelDetailById(dto.getTravelDetailsId());
        List<User> allEmp=dto.getEmployees().stream().map(
                i->findUserById(i)
        ).toList();
        for (User user:allEmp) {
            if(!travelDetail.getUsers().contains(user))
            {
                travelDetail.getUsers().add(user);
            }
        }

        travelDetailRepository.save(travelDetail);
        return new BasicResponce("All employee added sucessfully");

    }
    public BasicResponce removeEmployee(Long id,Long userId) {
        TravelDetail travelDetail=findTravelDetailById(id);
        User emp= findUserById(userId);
        travelDetail.getUsers().remove(emp);
        travelDetailRepository.save(travelDetail);
        return new BasicResponce("deleted sucessfully");
    }

    public TravelDetail findTravelDetailById(Long id)
    {
        return travelDetailRepository.findById(id).orElseThrow(()-> new RuntimeException("Travel details not found"));
    }

    public User findUserById(Long id)
    {
        return userRepo.findById(id).orElseThrow(()-> new RuntimeException("user  not found"));
    }

}
