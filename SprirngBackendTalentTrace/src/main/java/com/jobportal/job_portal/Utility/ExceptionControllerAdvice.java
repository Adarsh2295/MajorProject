package com.jobportal.job_portal.Utility;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jobportal.job_portal.Exceptions.JobPortalException;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @Autowired
    private Environment environment;

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Errorinfo> generealException(Exception e) {
        Errorinfo errorinfo = new Errorinfo(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorinfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(value = JobPortalException.class)
    public ResponseEntity<Errorinfo> generealException(JobPortalException e) {
        String msg = environment.getProperty(e.getMessage());
        Errorinfo errorinfo = new Errorinfo(msg , HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorinfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler({MethodArgumentNotValidException.class,ConstraintViolationException.class})
    public ResponseEntity<Errorinfo> validationExcetionHandler(Exception e) {
       String msg = "";
       if(e instanceof MethodArgumentNotValidException mException){
            msg = mException.getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining(", "));
       }
       else{
            ConstraintViolationException cException = (ConstraintViolationException)e;
            msg = cException.getConstraintViolations().stream().map(ConstraintViolation::getMessage).collect(Collectors.joining(", "));
       }
       Errorinfo errorinfo = new Errorinfo(msg, HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
       return new ResponseEntity<>(errorinfo, HttpStatus.BAD_REQUEST);
    }
}
