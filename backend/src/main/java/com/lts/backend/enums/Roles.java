package com.lts.backend.enums;

public enum Roles {
	
	ADMIN("admin"),
	
	USER_AMBULANCIA("user_ambulancia"),
	
	USER_HOSPITAL("user_hospital");
	
	private String role;
	
	Roles(String role) {
		
		this.role = role;
	}
	
	public String getRole()
	{
		return role;
	}
}
