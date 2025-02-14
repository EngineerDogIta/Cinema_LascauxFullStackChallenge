package it.yari.lascaux.cinemabe.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@Data
@Entity
public class MovieSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    // Associazione verso il film (non opzionale)
    @ManyToOne(optional = false)
    private Movie movie;

    private LocalDate startDate;

    private LocalDate endDate;
}
