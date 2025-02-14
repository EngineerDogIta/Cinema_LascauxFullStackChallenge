package it.yari.lascaux.cinemabe.service;

import it.yari.lascaux.cinemabe.entity.MovieSchedule;
import it.yari.lascaux.cinemabe.repository.MovieScheduleRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovieScheduleService {

    private final MovieScheduleRepository movieScheduleRepository;

    public MovieScheduleService(MovieScheduleRepository movieScheduleRepository){
        this.movieScheduleRepository = movieScheduleRepository;
    }

    public List<MovieSchedule> getAllSchedules(){
        return movieScheduleRepository.findAll();
    }

    public Optional<MovieSchedule> getScheduleById(Long id){
        return movieScheduleRepository.findById(id);
    }

    public MovieSchedule createSchedule(MovieSchedule schedule){
        return movieScheduleRepository.save(schedule);
    }

    public MovieSchedule updateSchedule(Long id, MovieSchedule scheduleDetails){
        return movieScheduleRepository.findById(id)
                .map(schedule -> {
                    schedule.setStartDate(scheduleDetails.getStartDate());
                    schedule.setEndDate(scheduleDetails.getEndDate());
                    schedule.setMovie(scheduleDetails.getMovie());
                    return movieScheduleRepository.save(schedule);
                })
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
    }

    public void deleteSchedule(Long id){
        movieScheduleRepository.deleteById(id);
    }

    public List<MovieSchedule> getSchedulesOverlapping(LocalDate startDate, LocalDate endDate) {
        return movieScheduleRepository.findSchedulesOverlapping(startDate, endDate);
    }

    public List<MovieSchedule> getHistoricalSchedules(LocalDate currentDate){
        return movieScheduleRepository.findHistoricalSchedules(currentDate);
    }
}
