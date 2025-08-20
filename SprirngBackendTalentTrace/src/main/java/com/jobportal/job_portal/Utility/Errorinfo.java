package com.jobportal.job_portal.Utility;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Errorinfo {

    private String errorMessage;
    private Integer errorCode;
    private LocalDateTime timeStamp;
    
}
