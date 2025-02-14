package it.yari.lascaux.cinemabe.repository;

import it.yari.lascaux.cinemabe.entity.MovieSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MovieScheduleRepository extends JpaRepository<MovieSchedule, Long> {

    // Query per ottenere le programmazioni dei film che si sovrappongono all'intervallo specificato.
    // La condizione ms.startDate <= :endDate AND ms.endDate >= :startDate garantisce che l'intervallo della programmazione
    // intersechi quello fornito dall'utente.
    @Query("SELECT ms FROM MovieSchedule ms JOIN FETCH ms.movie WHERE ms.startDate <= :endDate AND ms.endDate >= :startDate")
    List<MovieSchedule> findSchedulesOverlapping(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    // Query per ottenere lo storico delle programmazioni, ovvero quelle in cui la data di fine è già passata.
    @Query("SELECT ms FROM MovieSchedule ms JOIN FETCH ms.movie WHERE ms.endDate < :currentDate")
    List<MovieSchedule> findHistoricalSchedules(@Param("currentDate") LocalDate currentDate);
}
