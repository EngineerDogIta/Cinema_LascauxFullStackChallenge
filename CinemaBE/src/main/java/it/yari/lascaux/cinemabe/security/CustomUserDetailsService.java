package it.yari.lascaux.cinemabe.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;
import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    // Esempio di utente fisso per la demo. In un'applicazione reale, cerca l'utente nel database.
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("user".equals(username)) {
            return User.withUsername("user")
                    .password("{noop}password") // {noop} indica che la password non è codificata
                    .authorities(Collections.emptyList())
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }
}
