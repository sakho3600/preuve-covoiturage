// tslint:disable:prefer-conditional-expression
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { objectKeys } from 'codelyzer/util/objectKeys';

import { FilterUxInterface } from '~/core/interfaces/filter/filterUxInterface';
import { Filter } from '~/core/entities/filter/filter';
import { FilterInterface } from '~/core/interfaces/filter/filterInterface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public filter$ = new BehaviorSubject<FilterInterface | {}>({});

  constructor() {}

  public setFilter(filterUx: FilterUxInterface | {} = {}): void {
    // format filterUx to filter in api format
    let filter;

    if ('campaignIds' in filterUx) {
      filter = new Filter({
        date: filterUx.date,
        hour: <any>filterUx.hour,
        days: filterUx.days,
        towns: filterUx.towns,
        distance: filterUx.distance,
        ranks: filterUx.ranks,
        status: filterUx.status,
        territory_id: filterUx.territoryIds,
        operator_id: filterUx.operatorIds,
        campaign_id: filterUx.campaignIds,
      });

      if (filter.date.start === null && filter.date.end === null) {
        delete filter.date;
      } else {
        if (filter.date.start) filter.date.start = filter.date.start.toDate();
        if (filter.date.end) filter.date.end = filter.date.end.toDate();
      }

      if (filter.hour.start === null && filter.hour.end === null) {
        delete filter.hour;
      } else {
        // only get hours
        if (filter.hour.start && filter.hour.start.length > 1) {
          filter.hour.start = Number(filter.hour.start.slice(0, 2));
        } else {
          filter.hour.start = 0;
        }

        if (filter.hour.end && filter.hour.end.length > 1) {
          filter.hour.end = Number(filter.hour.end.slice(0, 2));
        } else {
          filter.hour.end = 23;
        }
      }

      // format distance to Number
      if (filter.distance.min) {
        filter.distance.min = Number(filter.distance.min);
      } else {
        delete filter.distance.min;
      }
      if (filter.distance.max) {
        filter.distance.max = Number(filter.distance.max);
      } else {
        delete filter.distance.max;
      }

      // delete distance key if object is empty
      if (Object.keys(filter.distance).length === 0) {
        delete filter.distance;
      }

      // remove empty arrays & null values
      Object.keys(filter).forEach((key) => {
        if (filter[key] === null || (Array.isArray(filter[key]) && filter[key].length === 0)) {
          delete filter[key];
        }
      });
    }

    this.filter$.next(filter);
  }
}
