package it.yari.lascaux.cinemabe.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class MovieSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Associazione verso il film (non opzionale)
    @ManyToOne(optional = false)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    private LocalDate startDate;

    private LocalDate endDate;
}
