/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Movie } from './movie';

/**
 * A schedule for a movie showing
 */
export interface MovieSchedule {

  /**
   * End date of the movie schedule
   */
  endDate: string;

  /**
   * Unique identifier for the schedule
   */
  id?: number;

  /**
   * The movie associated with this schedule
   */
  movie: Movie;

  /**
   * Start date of the movie schedule
   */
  startDate: string;
}
