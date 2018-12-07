package com.example.zal.repository;

import com.example.zal.model.Reservation;
import com.example.zal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Iterable<Reservation> findAllByUser(User user);
}
