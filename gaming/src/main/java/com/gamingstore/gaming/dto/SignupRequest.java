package com.gamingstore.gaming.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SignupRequest {
    
	@NotBlank
	private String name;
	
	@Email
	private String email;
	
	@Size(min=6)
	private String password;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public SignupRequest(@NotBlank String name, @Email String email, @Size(min = 6) String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public SignupRequest() {
		
    }
	
	
}
