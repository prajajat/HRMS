package com.example.demo.exception;

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
    public int  getStatus(){return this.status;}
}
