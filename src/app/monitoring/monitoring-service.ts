import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonitoringService {
  private isLogTracingEnabled = false;

  enableLogTracing() {
    this.isLogTracingEnabled = true;
  }

  logException(exception: unknown) {
    this.writeToConsole(exception);
  }

  private writeToConsole(exception: unknown) {
    console.error(exception);
  }

  // logTrace(message: string, properties?: Record<string, unknown>) {
  //   if (this.isLogTracingEnabled) {
  //   }
  // }
}
