package com.viktor.comicalert.service;

import com.viktor.comicalert.dto.TokenDto;
import com.viktor.comicalert.dto.UserDataDto;
import com.viktor.comicalert.security.JwtGenerator;
import com.viktor.comicalert.security.UserImplementationService;
import org.springframework.security.core.Authentication;
import com.viktor.comicalert.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {

    private final JwtGenerator jwtGenerator;

    private final UserImplementationService userImplementationService;
    private final PasswordEncoder encoder;

    public AuthService(JwtGenerator jwtGenerator, UserImplementationService userImplementationService, PasswordEncoder encoder) {
        this.jwtGenerator = jwtGenerator;
        this.userImplementationService = userImplementationService;
        this.encoder = encoder;
    }

    public TokenDto authenticate(Authentication authentication) {
        if (authentication == null) {
            return null;
        }

        String username = authentication.getName();
        String token = jwtGenerator.generate(authentication);
        return new TokenDto(username, token);
    }

    public UserDataDto register(UserDataDto userDataDto) {
        if (userImplementationService.userExists(userDataDto.username())) {
            return null;
        }

        User user = new User();
        user.setUsername(userDataDto.username());
        user.setPassword(encoder.encode(userDataDto.password()));
        user.setAuthorities(Set.of("USER"));
        userImplementationService.createUser(user);
        return userDataDto;
    }


}
