package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(RuntimeException.class)
        public ResponseEntity<ApiError> handleRuntimeException(RuntimeException ex) {
            ApiError error =new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "something worng happend ",ex.getMessage()
            );
            return new ResponseEntity<>(error ,HttpStatus.INTERNAL_SERVER_ERROR);
        }


}
