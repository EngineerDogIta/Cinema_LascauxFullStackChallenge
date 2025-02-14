package it.yari.lascaux.cinemabe.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import it.yari.lascaux.cinemabe.entity.Movie;
import it.yari.lascaux.cinemabe.entity.MovieSchedule;
import it.yari.lascaux.cinemabe.security.JwtUtils;
import it.yari.lascaux.cinemabe.security.SecurityConfig;
import it.yari.lascaux.cinemabe.service.MovieScheduleService;
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

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MovieScheduleController.class)
@Import(SecurityConfig.class)
public class MovieScheduleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MovieScheduleService movieScheduleService;

    @MockitoBean
    private JwtUtils jwtUtils;

    @MockitoBean
    private UserDetailsService userDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    private final String baseUrl = "/api/schedules";

    @BeforeEach
    void setup() {
        when(jwtUtils.validateJwtToken(any())).thenReturn(true);
        when(jwtUtils.getUsernameFromToken(any())).thenReturn("testuser");
        when(userDetailsService.loadUserByUsername("testuser"))
                .thenReturn(new User("testuser", "password", Collections.emptyList()));
    }

    private String getAuthHeader() {
        return "Bearer mockToken";
    }

    @Test
    void getAllSchedules_shouldReturnSchedules() throws Exception {
        MovieSchedule schedule = new MovieSchedule();
        schedule.setId(1L);
        when(movieScheduleService.getAllSchedules()).thenReturn(List.of(schedule));

        mockMvc.perform(get(baseUrl)
                        .header("Authorization", getAuthHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void getScheduleById_shouldReturnSchedule() throws Exception {
        MovieSchedule schedule = new MovieSchedule();
        schedule.setId(1L);
        when(movieScheduleService.getScheduleById(1L)).thenReturn(Optional.of(schedule));

        mockMvc.perform(get(baseUrl + "/1")
                        .header("Authorization", getAuthHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void createSchedule_shouldReturnCreatedSchedule() throws Exception {
        MovieSchedule schedule = new MovieSchedule();
        schedule.setStartDate(LocalDate.now());
        schedule.setEndDate(LocalDate.now().plusDays(7));

        when(movieScheduleService.createSchedule(any(MovieSchedule.class))).thenReturn(schedule);

        mockMvc.perform(post(baseUrl)
                        .header("Authorization", getAuthHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(schedule)))
                .andExpect(status().isOk());
    }

    @Test
    void updateSchedule_shouldReturnUpdatedSchedule() throws Exception {
        MovieSchedule schedule = new MovieSchedule();
        schedule.setId(1L);
        schedule.setStartDate(LocalDate.now());
        schedule.setEndDate(LocalDate.now().plusDays(7));

        when(movieScheduleService.updateSchedule(anyLong(), any(MovieSchedule.class))).thenReturn(schedule);

        mockMvc.perform(put(baseUrl + "/1")
                        .header("Authorization", getAuthHeader())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(schedule)))
                .andExpect(status().isOk());
    }

    @Test
    void deleteSchedule_shouldReturnNoContent() throws Exception {
        mockMvc.perform(delete(baseUrl + "/1")
                        .header("Authorization", getAuthHeader()))
                .andExpect(status().isNoContent());
    }

    @Test
    void getOverlappingSchedules_shouldReturnOverlappingSchedules() throws Exception {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusDays(10);
        MovieSchedule schedule = new MovieSchedule();
        schedule.setStartDate(startDate);
        schedule.setEndDate(endDate);

        when(movieScheduleService.getSchedulesOverlapping(startDate, endDate)).thenReturn(List.of(schedule));

        mockMvc.perform(get(baseUrl + "/overlap")
                        .header("Authorization", getAuthHeader())
                        .param("startDate", startDate.toString())
                        .param("endDate", endDate.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].startDate").value(startDate.toString()))
                .andExpect(jsonPath("$[0].endDate").value(endDate.toString()));
    }

    @Test
    void getHistoricalSchedules_shouldReturnHistoricalSchedules() throws Exception {
        LocalDate currentDate = LocalDate.now();
        MovieSchedule schedule = new MovieSchedule();
        schedule.setStartDate(currentDate.minusDays(14));
        schedule.setEndDate(currentDate.minusDays(7));

        when(movieScheduleService.getHistoricalSchedules(currentDate)).thenReturn(List.of(schedule));

        mockMvc.perform(get(baseUrl + "/historical")
                        .header("Authorization", getAuthHeader()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].startDate").isNotEmpty())
                .andExpect(jsonPath("$[0].endDate").isNotEmpty());
    }
}
