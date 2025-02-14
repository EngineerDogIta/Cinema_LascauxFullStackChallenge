package it.yari.lascaux.cinemabe.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.yari.lascaux.cinemabe.entity.Movie;
import it.yari.lascaux.cinemabe.security.JwtUtils;
import it.yari.lascaux.cinemabe.security.SecurityConfig;
import it.yari.lascaux.cinemabe.service.MovieService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MovieController.class)
@Import(SecurityConfig.class) // Importa la configurazione di sicurezza
public class MovieControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MovieService movieService;

    @MockitoBean
    private JwtUtils jwtUtils;

    @MockitoBean
    private UserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        // Configurazione mock per JWT
        when(jwtUtils.validateJwtToken(anyString())).thenReturn(true);
        when(jwtUtils.getUsernameFromToken(anyString())).thenReturn("user");
        when(userDetailsService.loadUserByUsername("user"))
                .thenReturn(new User("user", "password", Collections.emptyList()));
    }

    private String getAuthHeader() {
        return "Bearer mockToken";
    }

    @Test
    void getAllMovies_shouldReturnMovies() throws Exception {
        Movie movie = new Movie();
        movie.setId(1L);
        movie.setTitle("Inception");

        when(movieService.getAllMovies()).thenReturn(List.of(movie));

        mockMvc.perform(get("/api/movies")
                        .header("Authorization", getAuthHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Inception"));
    }

    @Test
    void getMovieById_shouldReturnMovie() throws Exception {
        Movie movie = new Movie();
        movie.setId(1L);
        movie.setTitle("The Matrix");

        when(movieService.getMovieById(1L)).thenReturn(Optional.of(movie));

        mockMvc.perform(get("/api/movies/1")
                        .header("Authorization", getAuthHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("The Matrix"));
    }

    @Test
    void createMovie_shouldReturnCreatedMovie() throws Exception {
        Movie newMovie = new Movie();
        newMovie.setTitle("Interstellar");
        newMovie.setDescription("Sci-fi movie");

        when(movieService.createMovie(any(Movie.class))).thenReturn(newMovie);

        mockMvc.perform(post("/api/movies")
                        .header("Authorization", getAuthHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newMovie)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Interstellar"));
    }

    @Test
    void updateMovie_shouldReturnUpdatedMovie() throws Exception {
        Movie updatedMovie = new Movie();
        updatedMovie.setId(1L);
        updatedMovie.setTitle("Matrix Reloaded");

        when(movieService.updateMovie(any(Long.class), any(Movie.class))).thenReturn(updatedMovie);

        mockMvc.perform(put("/api/movies/1")
                        .header("Authorization", getAuthHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedMovie)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Matrix Reloaded"));
    }

    @Test
    void deleteMovie_shouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/api/movies/1")
                        .header("Authorization", getAuthHeader()))
                .andExpect(status().isNoContent());
    }
}
