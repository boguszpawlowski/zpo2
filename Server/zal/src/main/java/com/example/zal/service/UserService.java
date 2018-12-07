package com.example.zal.service;

import com.example.zal.model.User;
import com.example.zal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user==null){
            return null;
        }
        return new MyUserPrincipal(user);
    }

    public User saveUser(User user){
        user.setEnabled(true);
        user.setPassword("{noop}"+user.getPassword());
        user.setRole("USER");
        return userRepository.save(user);
    }


    public class MyUserPrincipal implements UserDetails {
        private User user;

        public MyUserPrincipal(User user) {
            this.user = user;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
        }

        @Override
        public String getPassword() {
            return user.getPassword();
        }

        @Override
        public String getUsername() {
            return user.getUsername();
        }

        @Override
        public boolean isAccountNonExpired() {
            return false;
        }

        @Override
        public boolean isAccountNonLocked() {
            return false;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return false;
        }

        @Override
        public boolean isEnabled() {
            return false;
        }
    }
}
