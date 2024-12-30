import { Injectable, Inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SensorData } from './sensor-data.model';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  private apiUrl = 'http://localhost:8080/pitWall-bridge'; // Replace with your API URL
  private intervalId: any;
  isBrowser = signal(false);

  public sensorData: WritableSignal<SensorData> = signal(new SensorData("---", 0, 0));

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  startDataStream() {
    if (this.isBrowser()) {
      console.log("starting data stream!");
      this.intervalId = setInterval(() => this.updateData(), 250); // Every 250 ms
    }
  }

  stopDataStream() {
    clearInterval(this.intervalId);
    this.sensorData.update((s) => 
      s = new SensorData("---", 0, 0)
    )
  }

  updateData() {
    const payload: any = ['gps-1'];
    this.postData(payload).subscribe({
      next: (data) => {
        console.log(data);
        this.sensorData.update((s) => 
          s = data[0]["data"]
        );
      },
      error:
      (error) => {
        console.error(error);
      }
    });
  }

  postData(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
