package com.roima.HRMS.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<ApiError> handleRuntimeException(RuntimeException ex) {
            ApiError error =new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "something wrong happend ",ex.getMessage()
            );
            return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
        }

    @ExceptionHandler(JwtInvalidException.class)
    public ResponseEntity<ApiError> handleJwtInvalidException(JwtInvalidException ex) {
        ApiError error =new ApiError(5001, "something wrong happend ",ex.getMessage()
        );
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }

}

