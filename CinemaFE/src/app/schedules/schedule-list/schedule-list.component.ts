import { Component, OnInit } from '@angular/core';
import { SchedulesService } from '../../core/api/services/schedules.service';
import { MovieSchedule } from '../../core/api/models/movie-schedule';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgForOf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-schedule-list',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatIcon,
    DatePipe,
    MatIconButton,
    NgForOf
  ],
  template: `
    <div class="container">
      <h2>Schedules</h2>
      <mat-accordion>
        <mat-expansion-panel *ngFor="let schedule of schedules">
          <mat-expansion-panel-header>
            {{ schedule.movie.title }} ({{ schedule.startDate }} - {{ schedule.endDate }})
          </mat-expansion-panel-header>

          <p>Start: {{ schedule.startDate | date }}</p>
          <p>End: {{ schedule.endDate | date }}</p>

          <button mat-icon-button (click)="deleteSchedule(schedule.id ?? 0)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `
})
export class ScheduleListComponent implements OnInit {
  schedules: MovieSchedule[] = [];

  constructor(private schedulesService: SchedulesService) {}

  ngOnInit() {
    this.loadSchedules();
  }

  private loadSchedules() {
    this.schedulesService.getAllSchedules().subscribe(schedules => {
      this.schedules = schedules;
    });
  }

  deleteSchedule(id: number) {
    this.schedulesService.deleteSchedule({ id }).subscribe(() => {
      this.loadSchedules();
    });
  }
}
