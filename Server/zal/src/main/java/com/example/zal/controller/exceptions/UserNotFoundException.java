package com.example.zal.controller.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User with id `"+id+"` does not exist");
    }
}
