package com.example.zal.model.validator;


import com.example.zal.model.Reservation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidDateValidator implements ConstraintValidator<ValidDate,Reservation> {

    @Override
    public void initialize(ValidDate constraintAnnotation) {

    }

    @Override
    public boolean isValid(Reservation reservation, ConstraintValidatorContext context) {
        return reservation.getReturnDate().isAfter(reservation.getRentDate());
    }
}
