package com.roima.HRMS.services;

import com.roima.HRMS.dtos.request.TravelDetailDTO;
import com.roima.HRMS.dtos.request.TravelExpenceDTO;
import com.roima.HRMS.dtos.responce.*;
import com.roima.HRMS.dtos.request.AddEmployeeDTO;
import com.roima.HRMS.entites.*;
import com.roima.HRMS.repos.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class TravelService {

    private final TravelDetailRepository travelDetailRepository;
    private final ModelMapper modelMapper ;
    private final UserRepository userRepo;
    private final TravelerRepository travelerRepository;
    private final TravelExpenseRepository travelExpenseRepository;
    private final DocumentRepository documentRepository;

    public List<TravelDetailResponseWithOutTravelerIdDTO> getAllTravelDetails()
    {
       List<TravelDetail> travelDetailList=travelDetailRepository.findAll();
        return  travelDetailList.stream().map(a ->
                                                        modelMapper.map(a, TravelDetailResponseWithOutTravelerIdDTO.class)
                                                ).collect(Collectors.toList());
    }

    public TravelDetailResponseWithOutTravelerIdDTO getTravelDetails(Long id)
    {
       return modelMapper.map( findTravelDetailById(id), TravelDetailResponseWithOutTravelerIdDTO.class);
    }

    public List<TravelExpenceResponceDTO> getAllTravelExpenseByTravelerId(Long travelerId)
    {
        Traveler traveler=findTravelerById(travelerId);

        return traveler.getTravelExpences().stream().map(
                 a->modelMapper.map(a,TravelExpenceResponceDTO.class)
        ) .toList();
    }

    public List<TravelDetailResponseWithTravelerIdDTO> getTravelDetailsByCreater(Long id)
    {
        User user=findUserById(id);
        List<TravelDetail> travelDetailList=travelDetailRepository.findByCreatedBy(user);

        return travelDetailList.stream().map(
                a->modelMapper.map(a, TravelDetailResponseWithTravelerIdDTO.class)
        ).toList();
    }

    public List<TravelDetailResponseWithOutTravelerIdDTO> getTravelDetailsByTraveler(Long id)
    {
        User user=findUserById(id);
        List<TravelDetail> travelDetailList=travelDetailRepository.findByTravelersUser(user);

        return travelDetailList.stream().map(
                a->modelMapper.map(a, TravelDetailResponseWithOutTravelerIdDTO.class)
        ).toList();
    }

    public Long getTravelerInfo(Long id,Long userId)
    {
        TravelDetail travelDetail=findTravelDetailById(id);
        User user=findUserById(userId);

        return travelerRepository.findByUserAndTravelDetail(user,travelDetail).get().getTravelerId();
    }


    public BasicResponce createTravelDetail(TravelDetailDTO dto)
    {
        User createdBy=findUserById(dto.getCreadtedBy());
        TravelDetail travelDetail=modelMapper.map(dto,TravelDetail.class);
        travelDetail.setCreatedBy(createdBy);
        travelDetailRepository.save(travelDetail);
        return new BasicResponce("created successfully");
    }

    public BasicResponce createUpdateTravelExpense(TravelExpenceDTO dto,Long id)
    {
        Traveler traveler=findTravelerById(dto.getTraveler());
        long maxAmount=maxRemaingAount(traveler);
        if(dto.getDocumentList().isEmpty())
        {
            throw new RuntimeException("expense need atleast one document");
        }
        else if(LocalDateTime.now().isBefore(traveler.getTravelDetail().getStartDate()))
        {
            throw new RuntimeException("travel not start yet");
        }
        else if(LocalDateTime.now().isAfter(traveler.getTravelDetail().getEndDate().plusDays(10)))
        {
            throw new RuntimeException("sorry... travel expense last date gone");
        }
        else if(dto.getAmount()>maxAmount)
        {
            throw new RuntimeException("you reach max amount per day. your can add till "+maxAmount);
        }

        List<Document> documents=new ArrayList<>();
        for(Long i:dto.getDocumentList())
        {
             documents.add(findDocumentById(i));
        }
        TravelExpense travelExpense=modelMapper.map(dto,TravelExpense.class);
        travelExpense.setTraveler(traveler);
        travelExpense.setDocuments(documents);
        if(id!=-1){
             //userId -> travelerId baki chhe
             travelExpense.setTravelExpencesId(findTravelExpenseById(id).getTravelExpencesId());

        }
        travelExpenseRepository.save(travelExpense);
        travelerRepository.save(traveler);
        return new BasicResponce(id==-1 ?"created successfully":"updated successfully");
    }
    public BasicResponce updateTravelDetails(Long id,TravelDetailDTO dto) {
        User createdBy=findUserById(dto.getCreadtedBy());
        TravelDetail travelDetail= findTravelDetailById(id);
        travelDetail.setCreatedBy(createdBy);
        modelMapper.map(dto,travelDetail);
        travelDetailRepository.save(travelDetail);
        return new BasicResponce("updated  sucessfully");
    }

    public BasicResponce deleteTravelDetails(Long id) {
        travelDetailRepository.deleteById(id);
        return new BasicResponce("deleted sucessfully");
    }
    public BasicResponce deleteTravelExpense(Long id) {
        travelExpenseRepository.deleteById(id);
        return new BasicResponce("deleted sucessfully");
    }

    public BasicResponce addEmployees(AddEmployeeDTO dto)
    {
        TravelDetail travelDetail= findTravelDetailById(dto.getTravelDetailsId());

        List<User> allEmp=dto.getEmployees().stream().map(
                i->findUserById(i)
        ).toList();

        List<User> addedEmp= new ArrayList<>();
        for(Traveler traveler: travelDetail.getTravelers())
        {
            addedEmp.add(traveler.getUser());
        }

        for (User user:allEmp) {
            if(!addedEmp.contains(user))
            {    Traveler newEmp=new Traveler();
                 newEmp.setUser(user);
                 newEmp.setTravelDetail(travelDetail);
                 travelDetail.getTravelers().add(newEmp);
                travelerRepository.save(newEmp);
            }
        }

        travelDetailRepository.save(travelDetail);
        return new BasicResponce("All employee added sucessfully");

    }
    public BasicResponce removeEmployee(Long id,Long userId) {
        TravelDetail travelDetail=findTravelDetailById(id);
        User emp= findUserById(userId);
        for(Traveler traveler: travelDetail.getTravelers())
        {
           if(traveler.getUser().equals(emp))
           {
               travelDetail.getTravelers().remove(traveler);
               travelDetailRepository.save(travelDetail);
               travelerRepository.delete(traveler);
               break;
           }
        }
        return new BasicResponce("deleted sucessfully");
    }

    public long maxRemaingAount(Traveler traveler)
    {
        List<TravelExpense>travelExpenses=traveler.getTravelExpences();
        Long maxAmount=traveler.getTravelDetail().getMaxAmoutPerDay();
        log.info("{}",maxAmount);
        for(TravelExpense travelExpense:travelExpenses)
        {
            maxAmount-=travelExpense.getAmount();
        }
        log.info("{}",maxAmount);
        return maxAmount;
    }
    public void checkValidation(TravelExpenceDTO dto)
    {

    }
    public TravelDetail findTravelDetailById(Long id)
    {
        return travelDetailRepository.findById(id).orElseThrow(()-> new RuntimeException("Travel details not found"));
    }
    public Document findDocumentById(Long id)
    {
        return documentRepository.findById(id).orElseThrow(()-> new RuntimeException("Document not found"));
    }
    public Traveler findTravelerById(Long id)
    {
        return travelerRepository.findById(id).orElseThrow(()-> new RuntimeException("traveler not found"));
    }
    public TravelExpense findTravelExpenseById(Long id)
    {
        return travelExpenseRepository.findById(id).orElseThrow(()-> new RuntimeException("travel expense not found"));
    }

    public User findUserById(Long id)
    {
        return userRepo.findById(id).orElseThrow(()-> new RuntimeException("user  not found"));
    }

}
