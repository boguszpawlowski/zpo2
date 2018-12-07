package com.example.zal.model;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Entity
@EqualsAndHashCode
@ToString
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private Boolean enabled;
    @Column
    private String role;


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public User(String username, String password, Boolean enabled, String role) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.role = role;
    }

    public User(String username, String password, Boolean enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User() {
    }
}
