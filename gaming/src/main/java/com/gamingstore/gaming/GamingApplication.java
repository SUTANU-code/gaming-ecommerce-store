package com.gamingstore.gaming;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class GamingApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamingApplication.class, args);
	}

}
