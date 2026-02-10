package com.roima.HRMS.exception;

import io.jsonwebtoken.ExpiredJwtException;

public class JwtInvalidException extends ExpiredJwtException {
    public JwtInvalidException(String msg){
        super(null,null,msg);
    }
}
