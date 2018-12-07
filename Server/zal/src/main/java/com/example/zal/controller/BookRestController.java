package com.example.zal.controller;

import com.example.zal.controller.exceptions.BookNotFoundException;
import com.example.zal.model.Book;
import com.example.zal.repository.AuthorRepository;
import com.example.zal.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/books")
@CrossOrigin(origins = "http://localhost:4200")
public class BookRestController {

    private final AuthorRepository authorRepository;

    private final BookRepository bookRepository;

    @Autowired
    public BookRestController(AuthorRepository authorRepository, BookRepository bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }


    @PostMapping()
    public Book addBook(@RequestBody Book book) {
        System.out.println(book.getAuthor().toString());
        System.out.println("book: " + book.toString());
        return bookRepository.save(book);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> selectBook(@PathVariable Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        return new ResponseEntity<Book>(book, HttpStatus.OK);
    }

    @GetMapping
    public Iterable<Book> selectAllBooks(@RequestParam int sort) {
        Sort.Direction sortDirection = sort == 0 ? Sort.Direction.DESC : Sort.Direction.ASC;
        return bookRepository.findAll(new Sort(sortDirection,"title"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> changeBook(@PathVariable Long id, @RequestBody Book book) {
        Book currentBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        currentBook.setUrl(book.getUrl());
        currentBook.setIsbn(book.getIsbn());
        currentBook.setAuthor(book.getAuthor());
        currentBook.setTitle(book.getTitle());
        bookRepository.save(currentBook);
        return new ResponseEntity<Book>(currentBook, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));

        bookRepository.delete(book);
        return new ResponseEntity<Book>(HttpStatus.NO_CONTENT);
    }
}
