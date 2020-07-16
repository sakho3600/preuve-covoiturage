import { StaticRuleInterface } from '../../interfaces/RuleInterface';

import { AdultOnlyFilter } from './AdultOnlyFilter';
import { DistanceRangeFilter } from './DistanceRangeFilter';
import { DriverOnlyFilter } from './DriverOnlyFilter';
import { InseeBlacklistFilter, InseeWhitelistFilter } from './InseeFilter';
import { OperatorWhitelistFilter } from './OperatorWhitelistFilter';
import { RankWhitelistFilter } from './RankWhitelistFilter';
import { TimeRangeFilter } from './TimeRangeFilter';
import { WeekdayFilter } from './WeekdayFilter';
import { PassengerOnlyFilter } from './PassengerOnlyFilter';

export const filters: StaticRuleInterface[] = [
  AdultOnlyFilter,
  DistanceRangeFilter,
  DriverOnlyFilter,
  InseeBlacklistFilter,
  InseeWhitelistFilter,
  OperatorWhitelistFilter,
  PassengerOnlyFilter,
  RankWhitelistFilter,
  TimeRangeFilter,
  WeekdayFilter,
];
