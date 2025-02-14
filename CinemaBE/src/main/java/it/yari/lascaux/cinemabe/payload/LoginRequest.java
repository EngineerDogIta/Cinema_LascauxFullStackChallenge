package it.yari.lascaux.cinemabe.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
