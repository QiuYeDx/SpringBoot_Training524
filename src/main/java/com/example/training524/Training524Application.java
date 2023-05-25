package com.example.training524;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.training524.dao")
public class Training524Application {

    public static void main(String[] args) {
        SpringApplication.run(Training524Application.class, args);
    }

}
