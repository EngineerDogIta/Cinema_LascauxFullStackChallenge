package it.yari.lascaux.cinemabe.repository;

import it.yari.lascaux.cinemabe.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByTitle(String title); // Metodo derivato per cercare un film in base al titolo
}
