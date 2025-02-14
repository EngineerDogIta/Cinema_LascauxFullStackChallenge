/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createMovie } from '../fn/movies/create-movie';
import { CreateMovie$Params } from '../fn/movies/create-movie';
import { deleteMovie } from '../fn/movies/delete-movie';
import { DeleteMovie$Params } from '../fn/movies/delete-movie';
import { getAllMovies } from '../fn/movies/get-all-movies';
import { GetAllMovies$Params } from '../fn/movies/get-all-movies';
import { getMovieById } from '../fn/movies/get-movie-by-id';
import { GetMovieById$Params } from '../fn/movies/get-movie-by-id';
import { Movie } from '../models/movie';
import { updateMovie } from '../fn/movies/update-movie';
import { UpdateMovie$Params } from '../fn/movies/update-movie';
import { Void } from '../models/void';


/**
 * Endpoints for movie operations
 */
@Injectable({ providedIn: 'root' })
export class MoviesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getMovieById()` */
  static readonly GetMovieByIdPath = '/api/movies/{id}';

  /**
   * Get a movie by ID.
   *
   * Retrieves details for a specific movie.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMovieById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMovieById$Response(params: GetMovieById$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return getMovieById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a movie by ID.
   *
   * Retrieves details for a specific movie.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMovieById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMovieById(params: GetMovieById$Params, context?: HttpContext): Observable<Movie> {
    return this.getMovieById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

  /** Path part for operation `updateMovie()` */
  static readonly UpdateMoviePath = '/api/movies/{id}';

  /**
   * Update a movie.
   *
   * Updates an existing movie by its ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMovie()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMovie$Response(params: UpdateMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return updateMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a movie.
   *
   * Updates an existing movie by its ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateMovie$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMovie(params: UpdateMovie$Params, context?: HttpContext): Observable<Movie> {
    return this.updateMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

  /** Path part for operation `deleteMovie()` */
  static readonly DeleteMoviePath = '/api/movies/{id}';

  /**
   * Delete a movie.
   *
   * Deletes a movie identified by its ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMovie()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMovie$Response(params: DeleteMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<Void>> {
    return deleteMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a movie.
   *
   * Deletes a movie identified by its ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMovie$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMovie(params: DeleteMovie$Params, context?: HttpContext): Observable<Void> {
    return this.deleteMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<Void>): Void => r.body)
    );
  }

  /** Path part for operation `getAllMovies()` */
  static readonly GetAllMoviesPath = '/api/movies';

  /**
   * List all movies.
   *
   * Retrieves a list of all movies.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMovies()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMovies$Response(params?: GetAllMovies$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Movie>>> {
    return getAllMovies(this.http, this.rootUrl, params, context);
  }

  /**
   * List all movies.
   *
   * Retrieves a list of all movies.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllMovies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMovies(params?: GetAllMovies$Params, context?: HttpContext): Observable<Array<Movie>> {
    return this.getAllMovies$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Movie>>): Array<Movie> => r.body)
    );
  }

  /** Path part for operation `createMovie()` */
  static readonly CreateMoviePath = '/api/movies';

  /**
   * Create a new movie.
   *
   * Creates a new movie record.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMovie()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMovie$Response(params: CreateMovie$Params, context?: HttpContext): Observable<StrictHttpResponse<Movie>> {
    return createMovie(this.http, this.rootUrl, params, context);
  }

  /**
   * Create a new movie.
   *
   * Creates a new movie record.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createMovie$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMovie(params: CreateMovie$Params, context?: HttpContext): Observable<Movie> {
    return this.createMovie$Response(params, context).pipe(
      map((r: StrictHttpResponse<Movie>): Movie => r.body)
    );
  }

}
