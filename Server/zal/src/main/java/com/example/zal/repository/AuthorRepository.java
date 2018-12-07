package com.example.zal.repository;

import com.example.zal.model.Author;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    List<Author> findAll(Sort sort);

    @Query(value = "SELECT a from author a where a.surname like concat('%',:surname)",nativeQuery = true)
    List<Author> findAllBySurname(@Param("surname") String surname);
}
