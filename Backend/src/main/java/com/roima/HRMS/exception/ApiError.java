package com.roima.HRMS.exception;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ApiError
{
    public int status;
    private String error;
    private String msg;

    public ApiError(int status,String error,String msg)
    {
        this.error=error;
        this.msg=msg;
        this.status=status;
    }

}
