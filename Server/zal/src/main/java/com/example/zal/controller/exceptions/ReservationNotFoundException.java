package com.example.zal.controller.exceptions;

public class ReservationNotFoundException extends RuntimeException {
    public ReservationNotFoundException(Long id) {
        super("User with id `"+id+"` does not exist");
    }
}
