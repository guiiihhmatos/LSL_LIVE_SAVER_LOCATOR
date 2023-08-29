package com.lts.backend.enums;

public enum Roles {
	
	ADMIN("admin"),
	
	USER_AMBULANCIA("user_ambulancia");
	
	private String role;
	
	Roles(String role) {
		
		this.role = role;
	}
	
	public String getRole()
	{
		return role;
	}
}
