package com.roima.HRMS.services;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) {
        try{
            String publicId= UUID.randomUUID().toString();

            Map uploadResult =cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id",publicId,
                            "resource_type","auto"
                    ));
            return uploadResult.get("secure_url").toString();

        }catch (IOException e){
            log.info("error in coludinary service:  {}",e);
        }
        return "";
    }
}