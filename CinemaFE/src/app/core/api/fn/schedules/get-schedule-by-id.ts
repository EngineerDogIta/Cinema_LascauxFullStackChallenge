/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MovieSchedule } from '../../models/movie-schedule';

export interface GetScheduleById$Params {

/**
 * Unique identifier of the schedule
 */
  id: number;
}

export function getScheduleById(http: HttpClient, rootUrl: string, params: GetScheduleById$Params, context?: HttpContext): Observable<StrictHttpResponse<MovieSchedule>> {
  const rb = new RequestBuilder(rootUrl, getScheduleById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MovieSchedule>;
    })
  );
}

getScheduleById.PATH = '/api/schedules/{id}';
