import { inject, Injectable } from '@angular/core';
import { MonitoringService } from '../monitoring/monitoring-service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private readonly monitoringService = inject(MonitoringService);

  logError(error: unknown) {
    this.monitoringService.logException(error);
  }
}
