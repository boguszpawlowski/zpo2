package com.example.zal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.Arrays;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource dataSource;

    @Autowired
    private CustomSuccessHandler successHandler;

    @Autowired
    private RestAuthEntryPoint restAuthEntryPoint;


    private SimpleUrlAuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf()
                .disable()
                .exceptionHandling()
                .authenticationEntryPoint(restAuthEntryPoint)
                .and()
                .authorizeRequests()
                .antMatchers("/register")
                .permitAll()
                .antMatchers("/api", "/users")
                .authenticated()
                .and()
                .formLogin()
                .successHandler(successHandler)
                .failureHandler(failureHandler)
                .and()
                .logout().logoutUrl("/logout")
                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_NO_CONTENT))
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");

    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("select username,password,enabled from user where username = ?")
                .authoritiesByUsernameQuery("select username,role from user where username = ?");
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedHeader("*");
        configuration.addAllowedOrigin("*");
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "OPTIONS", "PUT"));
        configuration.setAllowCredentials(true);

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
