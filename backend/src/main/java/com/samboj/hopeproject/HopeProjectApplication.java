package com.samboj.hopeproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.samboj.hopeproject"})
public class HopeProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(HopeProjectApplication.class, args);
    }

}
