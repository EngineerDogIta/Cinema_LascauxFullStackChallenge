package it.yari.lascaux.cinemabe.controller;

import it.yari.lascaux.cinemabe.entity.MovieSchedule;
import it.yari.lascaux.cinemabe.service.MovieScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class MovieScheduleController {

    private final MovieScheduleService movieScheduleService;

    public MovieScheduleController(MovieScheduleService movieScheduleService){
        this.movieScheduleService = movieScheduleService;
    }

    @GetMapping
    public ResponseEntity<List<MovieSchedule>> getAllSchedules(){
        return ResponseEntity.ok(movieScheduleService.getAllSchedules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieSchedule> getScheduleById(@PathVariable Long id){
        return movieScheduleService.getScheduleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MovieSchedule> createSchedule(@RequestBody MovieSchedule schedule){
        return ResponseEntity.ok(movieScheduleService.createSchedule(schedule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieSchedule> updateSchedule(@PathVariable Long id, @RequestBody MovieSchedule schedule){
        return ResponseEntity.ok(movieScheduleService.updateSchedule(id, schedule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id){
        movieScheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint per ottenere le schedule che si sovrappongono ad un intervallo
    @GetMapping("/overlap")
    public ResponseEntity<List<MovieSchedule>> getOverlappingSchedules(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        return ResponseEntity.ok(movieScheduleService.getSchedulesOverlapping(start, end));
    }

    // Endpoint per ottenere le schedule storiche
    @GetMapping("/historical")
    public ResponseEntity<List<MovieSchedule>> getHistoricalSchedules() {
        LocalDate currentDate = LocalDate.now();
        return ResponseEntity.ok(movieScheduleService.getHistoricalSchedules(currentDate));
    }
}
