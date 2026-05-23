import { TestBed } from '@angular/core/testing';

import { MonitoringService } from './monitoring-service';

describe('MonitoringService', () => {
  let service: MonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("enableLogTracing should set 'logTracingEnabled' to true", () => {
    service.enableLogTracing();
    expect(service['isLogTracingEnabled']).toBe(true);
  });

  it('logException should call writeToConsole with the provided exception', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const testException = new Error('Test exception');

    service.logException(testException);

    expect(consoleErrorSpy).toHaveBeenCalledWith(testException);
    consoleErrorSpy.mockRestore();
  });

  it('writeToConsole should log the exception to the console', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const testException = new Error('Test exception');

    service['writeToConsole'](testException);

    expect(consoleErrorSpy).toHaveBeenCalledWith(testException);
    consoleErrorSpy.mockRestore();
  });
});
