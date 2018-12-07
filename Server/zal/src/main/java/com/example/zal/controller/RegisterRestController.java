package com.example.zal.controller;

import com.example.zal.model.User;
import com.example.zal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping()
@CrossOrigin("http://localhost:4200")
public class RegisterRestController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){
        System.out.println(user.toString());
        if(userService.loadUserByUsername(user.getUsername())==null){
            User newUser =  userService.saveUser(user);
            return new ResponseEntity<User>(newUser,HttpStatus.OK);
        }
        return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
    }
}
