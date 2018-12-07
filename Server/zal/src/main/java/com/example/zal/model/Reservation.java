package com.example.zal.model;

import com.example.zal.model.validator.ValidDate;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "reservation")
@EqualsAndHashCode
@ValidDate
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "rent_date")
    @NotNull
    private LocalDate rentDate;
    @Column(name = "return_date")
    @NotNull
    @Future
    private LocalDate returnDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id", referencedColumnName = "id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Book book;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getRentDate() {
        return rentDate;
    }

    public void setRentDate(LocalDate rentDate) {
        this.rentDate = rentDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Reservation(@NotNull @Future LocalDate rentDate, @NotNull @Future LocalDate returnDate, Book book, User user) {
        this.rentDate = rentDate;
        this.returnDate = returnDate;
        this.book = book;
        this.user = user;
    }

    public Reservation() {
    }
}
