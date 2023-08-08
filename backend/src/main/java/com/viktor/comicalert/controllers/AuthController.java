package com.viktor.comicalert.controllers;

import com.viktor.comicalert.dto.TokenDto;
import com.viktor.comicalert.dto.UserDataDto;
import com.viktor.comicalert.exception.AuthenticationException;
import com.viktor.comicalert.exception.UserAlreadyExistsError;
import com.viktor.comicalert.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/authenticate")
    public TokenDto authenticate(Authentication authentication) {
        TokenDto tokenDto = authService.authenticate(authentication);
        System.out.println(tokenDto);
        if (tokenDto == null) throw new AuthenticationException("Authentication not provided!");
        return tokenDto;
    }


    @PostMapping("/register")
    public UserDataDto register(@RequestBody UserDataDto loginData) {
        UserDataDto userDataDto = authService.register(loginData);
        if (userDataDto == null) throw new UserAlreadyExistsError("User already exists!");
        return userDataDto;
    }


}
