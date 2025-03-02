/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MovieSchedule } from '../../models/movie-schedule';

export interface GetOverlappingSchedules$Params {

/**
 * Start date for the schedule overlap query (YYYY-MM-DD)
 */
  startDate: string;

/**
 * End date for the schedule overlap query (YYYY-MM-DD)
 */
  endDate: string;
}

export function getOverlappingSchedules(http: HttpClient, rootUrl: string, params: GetOverlappingSchedules$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MovieSchedule>>> {
  const rb = new RequestBuilder(rootUrl, getOverlappingSchedules.PATH, 'get');
  if (params) {
    rb.query('startDate', params.startDate, {});
    rb.query('endDate', params.endDate, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<MovieSchedule>>;
    })
  );
}

getOverlappingSchedules.PATH = '/api/schedules/overlap';
