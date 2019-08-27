package com.gmail.shabannikitka.crowdfunding.core.service;

import com.gmail.shabannikitka.crowdfunding.core.dto.UserDto;
import com.gmail.shabannikitka.crowdfunding.core.entity.User;
import com.gmail.shabannikitka.crowdfunding.core.entity.enums.Role;
import com.gmail.shabannikitka.crowdfunding.core.exception.RegisterException;
import com.gmail.shabannikitka.crowdfunding.core.repository.UserRepository;
import com.gmail.shabannikitka.crowdfunding.core.sequrity.Hasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    private final UserRepository userRepository;

    @Autowired
    public RegisterService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public void register(UserDto userDto) throws RegisterException {

        if (userRepository.findByLogin(userDto.login).isPresent()) {
            throw new RegisterException("client with such login already exist");
        }
            User client = new User(
                    userDto.login,
                    Hasher.getHash(userDto.password),
                    Role.DEFAULTUSER
            );
            userRepository.save(client);

    }
}
