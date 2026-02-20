package com.roima.HRMS.services;

import com.roima.HRMS.dtos.request.*;
import com.roima.HRMS.dtos.response.*;
import com.roima.HRMS.entites.*;
import com.roima.HRMS.repos.*;
import com.roima.HRMS.specification.TravelExpenseSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
    private final TravelerDocumentRepository travelerDocumentRepository;
    private final CloudinaryService cloudinaryService;
    private final NotificationRepository notificationRepository;

    // travel details

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

    public List<TravelDetailResponseWithTravelerIdDTO> getTravelDetailsByCreater(Long id)
    {
        User user=findUserById(id);
        List<TravelDetail> travelDetailList=travelDetailRepository.findByCreatedBy(user);

        return travelDetailList.stream().map(
                a->modelMapper.map(a, TravelDetailResponseWithTravelerIdDTO.class)
        ).toList();
    }

    public List<TravelDetailsResponseWithInTeavelerIdDTO> getTravelDetailsByTraveler(Long id)
    {
        User user=findUserById(id);
        List<TravelDetail> travelDetailList=travelDetailRepository.findByTravelersUser(user);
        List<TravelDetailsResponseWithInTeavelerIdDTO> travelDetailsResponseWithInTeavelerIdDTOS=new ArrayList<>();
        for(TravelDetail travelDetail:travelDetailList)
        {
            TravelDetailsResponseWithInTeavelerIdDTO travelDetailsResponseWithInTeavelerIdDTO =modelMapper.map(travelDetail,TravelDetailsResponseWithInTeavelerIdDTO.class);
            travelDetailsResponseWithInTeavelerIdDTO.setTravelerId(
             travelerRepository.findByUserAndTravelDetail(user,travelDetail).get().getTravelerId());
            travelDetailsResponseWithInTeavelerIdDTOS.add(travelDetailsResponseWithInTeavelerIdDTO);
        }
        return  travelDetailsResponseWithInTeavelerIdDTOS;
    }

    public BasicResponse createTravelDetail(TravelDetailDTO dto)
    {
        User createdBy=findUserById(dto.getCreadtedBy());
        TravelDetail travelDetail=modelMapper.map(dto,TravelDetail.class);
        travelDetail.setCreatedBy(createdBy);
        travelDetailRepository.save(travelDetail);
        return new BasicResponse("created successfully");
    }

    public BasicResponse updateTravelDetails(Long id, TravelDetailDTO dto) {
        User createdBy=findUserById(dto.getCreadtedBy());
        TravelDetail travelDetail= findTravelDetailById(id);
        travelDetail.setCreatedBy(createdBy);
        modelMapper.map(dto,travelDetail);
        travelDetailRepository.save(travelDetail);
        return new BasicResponse("updated  sucessfully");
    }
    public BasicResponse deleteTravelDetails(Long id) {
        travelDetailRepository.deleteById(id);
        return new BasicResponse("deleted successfully");
    }


   // traveler
    public Long getTravelerInfo(Long id,Long userId)
    {
        TravelDetail travelDetail=findTravelDetailById(id);
        User user=findUserById(userId);

        return travelerRepository.findByUserAndTravelDetail(user,travelDetail).get().getTravelerId();
    }


    //travel expense
    public List<TravelExpenseResponseDTO> getAllTravelExpenseByTravelerId(Long travelerId)
    {
        Traveler traveler=findTravelerById(travelerId);

        return traveler.getTravelExpenses().stream().map(
                a->modelMapper.map(a, TravelExpenseResponseDTO.class)
        ) .toList();
    }

    public List<TravelExpenseResponseDTO> getAllTravelExpenseByFilter(TravelExpenseFilterDTO filter) {
           Specification<TravelExpense> spec = TravelExpenseSpecification.withFilters(filter);

           return travelExpenseRepository.findAll(spec).stream().map(
                   a -> modelMapper.map(a, TravelExpenseResponseDTO.class))
            .toList();
    }
    public BasicResponse createUpdateTravelExpense(TravelExpenseDTO dto, List<MultipartFile> documents, Long id)
    {
        Traveler traveler=findTravelerById(dto.getTraveler());
        long maxAmount=maxRemaingAount(traveler);
        log.info("req in service");
        if(documents.isEmpty())
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
        User user=findUserById((Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        List<String> urls=new ArrayList<>();
        for(MultipartFile multipartFile:documents )
        {
            urls.add( cloudinaryService.uploadFile(multipartFile));
        }
        log.info("lll>>>{}",dto.getFileNameList());
        List<Document>newDocuments=new ArrayList<>();
        for(String url:urls)
        {
            Document document=new Document();
            document.setUploadedBy(user);
            document.setUrl(url);

            document.setOwnerType(dto.getOwnerType());
            document.setDocumentType(dto.getDocumentType());
            newDocuments.add(document);
        }
        IntStream.range(0,dto.getFileNameList().size()).forEach(
                i->newDocuments.get(i).setFileName(dto.getFileNameList().get(i))
        );
        documentRepository.saveAll(newDocuments);


        TravelExpense travelExpense=modelMapper.map(dto,TravelExpense.class);
        travelExpense.setStatus("pending");
        travelExpense.setTraveler(traveler);
        travelExpense.setDocuments(newDocuments);

        if(id!=-1){
            //todo userId -> travelerId baki chhe
            travelExpense.setTravelExpensesId(findTravelExpenseById(id).getTravelExpensesId());

        }

        travelExpenseRepository.save(travelExpense);
        travelerRepository.save(traveler);
        newDocuments.forEach(x->
            x.setTravelExpense(travelExpense)
        );
        documentRepository.saveAll(newDocuments);




        return new BasicResponse(id==-1 ?"created successfully":"updated successfully");
    }
    public BasicResponse patchTravelExpense(TravelExpenceStatusDTO dto,Long id,Long useId)
    {
        TravelExpense travelExpense=findTravelExpenseById(id);
        User user=findUserById(useId);
        if(dto.getStatus().equals("Rejected")&&dto.getRemark().isEmpty())
        {
            throw new RuntimeException("For reject status remark can't be empty");
        }
        modelMapper.map(dto,travelExpense);
        travelExpense.setUpdateBy(user);
        travelExpenseRepository.save(travelExpense);
        return new BasicResponse("Updated sucessfully");
    }
    public BasicResponse deleteTravelExpense(Long id) {
        travelExpenseRepository.deleteById(id);
        return new BasicResponse("deleted successfully");
    }


    // travel details with employee
    public BasicResponse addEmployees(AddEmployeeDTO dto)
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
                 Notification notification=new Notification();
                 notification.setDescription("New travel added for you :"+travelDetail.getTitle());
                 notification.setTitle("New Travel added");
                 notification.setUser(user);
                 notificationRepository.save(notification);
                travelerRepository.save(newEmp);
            }
        }

        travelDetailRepository.save(travelDetail);
        return new BasicResponse("All employee added successfully");

    }
    public BasicResponse removeEmployee(Long id, Long userId) {
        TravelDetail travelDetail=findTravelDetailById(id);
        User emp= findUserById(userId);
        Traveler travelerToRemove=null;
        for(Traveler traveler: travelDetail.getTravelers())
        {
           if(traveler.getUser().equals(emp))
           {

                travelerToRemove=traveler;
               break;
           }
        }
        if(travelerToRemove==null)
        {return new BasicResponse(" Emp not found");}


        Notification notification=new Notification();
        notification.setDescription("you removed from travel :"+travelDetail.getTitle());
        notification.setTitle("Travel removed");
        notification.setUser(emp);
        notificationRepository.save(notification);

            travelDetail.getTravelers().remove(travelerToRemove);
            travelerToRemove.getTravelerDocuments().size();
            travelerToRemove.getTravelExpenses().size();

            travelDetailRepository.save(travelDetail);
            travelerRepository.delete(travelerToRemove);
            return new BasicResponse("Updated successfully");


    }

     //traveler document

    public List<TravelerDocumentResponseDTO> getAllTravelerDocumentByTravelerId(Long id)
    {
        return travelerDocumentRepository.findByTraveler(findTravelerById(id)).stream().map(
                a->modelMapper.map(a, TravelerDocumentResponseDTO.class)
        ).toList();
    }

    public List<TravelerDocumentResponseDTO> getAllTravelerDocumentForManager(Long id)
    {
        User user=findUserById(id);
        List<TravelerDocument> travelerDocuments=new ArrayList<>();
        List<Traveler> travelers=new ArrayList<>();
                user.getTeamMember().forEach(
                        a->travelers.addAll(a.getTravelers())
                    );

        travelers.forEach(
                a->travelerDocuments.addAll(a.getTravelerDocuments())
        );
        log.info(" i>>{} i2>>{}",travelers.size(),user.getTeamMember().get(0).getTravelers().size());
        return travelerDocuments.stream().map(
                a->modelMapper.map(a, TravelerDocumentResponseDTO.class)
        ).toList();
    }

    public List<DocumentResponseDTO> getAllTravelerDocuments()
    {
//        TravelDetail travelDetail=findTravelDetailById(id);
//        List<Document> documents= documentRepository.findByUploadedBy(findUserById(userId));
//        List<Document> response=new ArrayList<>();
//        log.info(" i>>>>{}",documents.get(0).getDocumentId());
//        for(Document document:documents)
//        {log.info(" i2>>>>{}",document.getDocumentId());
//            if(document.getTravelerDocuments().isEmpty()
//                    ||
//                    !document.getTravelerDocuments().get(0).getTraveler().getTravelDetail().equals(travelDetail))
//            {
//                 documents.remove(document);
//            }
//        }
        List<Document> documents=documentRepository.findAllByTravelExpense(null);
        return  documents.stream().map(
                a->modelMapper.map(a, DocumentResponseDTO.class)
        ).toList();
    }
    public BasicResponse createTravelerDocument(TravelerDocumentDTO dto,MultipartFile document,Long id)
    {
        User user=findUserById(id);
        Document newDocument=new Document();
        newDocument.setUrl(cloudinaryService.uploadFile(document));
        newDocument.setFileName(dto.getFileName());
        newDocument.setDocumentType(dto.getDocumentType());
        newDocument.setOwnerType(dto.getOwnerType());
        newDocument.setUploadedBy(user);
        documentRepository.save(newDocument);
        if(dto.getVisibility().equals("All"))
        {
            List<Traveler> travelerAlreadyPresent =new ArrayList<>();
            for (TravelerDocument travelerDocument:travelerDocumentRepository.findByDocumentAndVisibility(newDocument,"All"))
            {
                travelerAlreadyPresent.add(travelerDocument.getTraveler());
            }
            for(Traveler traveler:findTravelDetailById(dto.getTravelDetailId()).getTravelers())
            {
                if(travelerAlreadyPresent.contains(traveler))
                {
                    continue;
                }
                TravelerDocument travelerDocument=new TravelerDocument();
                travelerDocument.setTraveler(traveler);
                travelerDocument.setDocument(newDocument);
                travelerDocument.setVisibility(dto.getVisibility());
                travelerDocumentRepository.save(travelerDocument);
            }
        }
        else{
            Traveler traveler;
            if(dto.getOwnerType().equals("HR"))
            {

                traveler=travelerRepository.findByUserAndTravelDetail(findUserById(dto.getTravelerId()),findTravelDetailById(dto.getTravelDetailId())).orElseThrow(()->new RuntimeException("no traveler found"));
            }
            else{
                traveler=findTravelerById(dto.getTravelerId());
            }

            List<TravelerDocument> travelerDocuments=travelerDocumentRepository.findByDocumentAndVisibilityAndTraveler(newDocument,dto.getVisibility(),traveler);
            if(travelerDocuments.isEmpty()) {
                TravelerDocument travelerDocument = new TravelerDocument();
                travelerDocument.setTraveler(traveler);
                travelerDocument.setDocument(newDocument);
                travelerDocument.setVisibility(dto.getVisibility());
                travelerDocumentRepository.save(travelerDocument);
            }
            else{
                throw new RuntimeException("This data can't be duplicate");
            }
         }
         return new BasicResponse("Created successfully");
    }
    public BasicResponse deleteTravelerDocument(Long id) {
        travelerDocumentRepository.deleteById(id);
        return new BasicResponse("deleted successfully");
    }

    // repeated code
    public long maxRemaingAount(Traveler traveler)
    {
        List<TravelExpense>travelExpenses=traveler.getTravelExpenses();
        Long maxAmount=traveler.getTravelDetail().getMaxAmoutPerDay();
        log.info("{}",maxAmount);
        for(TravelExpense travelExpense:travelExpenses)
        {
            maxAmount-=travelExpense.getAmount();
        }
        log.info("{}",maxAmount);
        return maxAmount;
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
