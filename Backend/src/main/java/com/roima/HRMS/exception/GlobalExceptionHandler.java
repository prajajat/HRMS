package com.roima.HRMS.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(RuntimeException.class)
        public ApiError handleRuntimeException(RuntimeException ex) {
            ApiError error =new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "something worng happend ",ex.getMessage()
            );
            return  error;
        }

    @ExceptionHandler(JwtInvalidException.class)
    public ApiError handleRuntimeException1(JwtInvalidException ex) {
        ApiError error =new ApiError(5001, "something worng happend ",ex.getMessage()
        );
        return  error;
    }

}
