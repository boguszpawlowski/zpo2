package com.example.zal.repository;

import com.example.zal.model.Book;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAll(Sort sort);
}
