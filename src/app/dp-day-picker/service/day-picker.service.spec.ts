/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {DayPickerService} from './day-picker.service';
import * as moment from 'moment';
import {Moment} from 'moment';

describe('Service: DayPicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayPickerService]
    });
  });

  it('should check generateCalendars method', inject([DayPickerService], (service: DayPickerService) => {
    const calendars1 = service.generateCalendars({calendarsAmount: 1}, null);
    expect(calendars1.length).toBe(1);
    expect(calendars1[0].month.isSame(moment(), 'month')).toBe(true);

    const calendars2 = service.generateCalendars({calendarsAmount: 2}, null);
    expect(calendars2.length).toBe(2);
    expect(calendars2[0].month.isSame(moment(), 'month')).toBe(true);
    expect(calendars2[1].month.isSame(moment().add(1, 'month'), 'month')).toBe(true);

    const calendars3 = service.generateCalendars({calendarsAmount: 2}, moment('13-10-2015', 'DD-MM-YYYY'));
    expect(calendars3.length).toBe(2);
    expect(calendars3[0].month.isSame(moment('13-10-2015', 'DD-MM-YYYY'), 'month')).toBe(true);
    expect(calendars3[1].month.isSame(moment('13-11-2015', 'DD-MM-YYYY'), 'month')).toBe(true);

    const calendars4 = service.generateCalendars({calendarsAmount: 2}, moment(), moment('13-10-2015', 'DD-MM-YYYY'));
    expect(calendars4.length).toBe(2);
    expect(calendars4[0].month.isSame(moment('13-10-2015', 'DD-MM-YYYY'), 'month')).toBe(true);
    expect(calendars4[1].month.isSame(moment('13-11-2015', 'DD-MM-YYYY'), 'month')).toBe(true);
  }));

  it('should check isDateValid method', inject([DayPickerService], (service: DayPickerService) => {
    expect(service.isDateValid('13-10-2015', 'DD-MM-YYYY')).toBe(true);
    expect(service.isDateValid('13-10-2015', 'DD-MM-YY')).toBe(false);
    expect(service.isDateValid('', 'DD-MM-YY')).toBe(true);
  }));

  it('should check moveCalendars method', inject([DayPickerService], (service: DayPickerService) => {
    const calendars1 = service.moveCalendars({calendarsAmount: 1}, null, moment(), 1);
    expect(calendars1.length).toBe(1);
    expect(calendars1[0].month.isSame(moment().add(1, 'month'), 'month')).toBe(true);

    const calendars2 = service.moveCalendars({calendarsAmount: 2}, null, moment(), 1);
    expect(calendars2.length).toBe(2);
    expect(calendars2[0].month.isSame(moment().add(1, 'month'), 'month')).toBe(true);
    expect(calendars2[1].month.isSame(moment().add(2, 'month'), 'month')).toBe(true);

    const calendars3 = service.moveCalendars({calendarsAmount: 2}, null, moment(), -1);
    expect(calendars3.length).toBe(2);
    expect(calendars3[0].month.isSame(moment().add(-1, 'month'), 'month')).toBe(true);
    expect(calendars3[1].month.isSame(moment(), 'month')).toBe(true);
  }));

  it('should check isMinMonth method', inject([DayPickerService], (service: DayPickerService) => {
    expect(service.isMinMonth(moment(), moment())).toBe(true);
    expect(service.isMinMonth(moment().subtract(1, 'month'), moment())).toBe(false);
    expect(service.isMinMonth(undefined, moment())).toBe(false);
  }));

  it('should check isMaxMonth method', inject([DayPickerService], (service: DayPickerService) => {
    expect(service.isMaxMonth(moment(), moment())).toBe(true);
    expect(service.isMaxMonth(moment().add(1, 'month'), moment())).toBe(false);
    expect(service.isMinMonth(undefined, moment())).toBe(false);
  }));

  it('should check getConfig method for dates format aspect', inject([DayPickerService], (service: DayPickerService) => {
    const config1 = service.getConfig({
      min: '2016-10-25',
      max: '2017-10-25',
      format: 'YYYY-MM-DD'
    });

    expect((<Moment>config1.min).isSame(moment('2016-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
    expect((<Moment>config1.max).isSame(moment('2017-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);

    const config2 = service.getConfig({
      min: moment('2016-10-25', 'YYYY-MM-DD'),
      max: moment('2017-10-25', 'YYYY-MM-DD')
    });

    expect((<Moment>config2.min).isSame(moment('2016-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
    expect((<Moment>config2.max).isSame(moment('2017-10-25', 'YYYY-MM-DD'), 'day')).toBe(true);
  }));
});
