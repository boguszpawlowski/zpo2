package com.example.zal.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Table(name = "book")
public class Book implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id",referencedColumnName = "id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Author author;
    @Column(unique = true)
    @NotNull
    private int isbn;
    @NotNull
    private String url;


    public Book() {
    }

    public Book(String title, Author author, int isbn, String url) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.url = url;
    }


    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public int getIsbn() {
        return isbn;
    }

    public void setIsbn(int isbn) {
        this.isbn = isbn;
    }


    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author=" + author +
                ", isbn=" + isbn +
                ", url='" + url + '\'' +
                '}';
    }
}

