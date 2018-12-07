package com.example.zal.controller;


import com.example.zal.controller.exceptions.AuthorNotFoundException;
import com.example.zal.model.Author;
import com.example.zal.repository.AuthorRepository;
import com.example.zal.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/authors")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthorRestController {
    private final AuthorRepository authorRepository;

    private final BookRepository bookRepository;

    @Autowired
    public AuthorRestController(AuthorRepository authorRepository, BookRepository bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }

    @PostMapping()
    public Author addAuthor(@RequestBody Author author) {
        return authorRepository.save(author);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> selectAuthor(@PathVariable Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new AuthorNotFoundException(id));

        return new ResponseEntity<Author>(author, HttpStatus.OK);
    }

    @GetMapping
    public Iterable<Author> selectAllAuthors(@RequestParam int sort) {
        Sort.Direction sortDirection = sort == 0 ? Sort.Direction.DESC : Sort.Direction.ASC;

        return authorRepository.findAll(new Sort(sortDirection,"surname"));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Author> changeAuthor(@PathVariable Long id, @RequestBody Author author) {
        Author currentAuthor = authorRepository.findById(id)
                .orElseThrow(() -> new AuthorNotFoundException(id));

        currentAuthor.setSurname(author.getSurname());
        currentAuthor.setName(author.getName());
        authorRepository.save(currentAuthor);

        return new ResponseEntity<Author>(currentAuthor, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Author> deleteAuthor(@PathVariable Long id) {
        System.out.println("Fetching & Deleting Author with id " + id);

        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new AuthorNotFoundException(id));

        authorRepository.delete(author);
        return new ResponseEntity<Author>(HttpStatus.NO_CONTENT);
    }

}
