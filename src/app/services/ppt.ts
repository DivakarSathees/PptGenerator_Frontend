import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SlideRequest {
  title: string;
  slides: number;
  model: string; // New field to specify the model
}

export interface PptResponse {
  message: string;
  output_file: string;
  slides_count: number;
  ppt_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class Ppt {
    // private apiUrl = 'http://127.0.0.1:8000'; // FastAPI URL
    private apiUrl = 'https://pptxgenerator-python.onrender.com'

  constructor(private http: HttpClient) {}

  generatePptSlides(request: SlideRequest): Observable<PptResponse> {
    return this.http.post<PptResponse>(`${this.apiUrl}/generate-ppt-slides`, [request]);
  }

  generatePpt(slidesJson: any[]): Observable<PptResponse> {
    return this.http.post<PptResponse>(`${this.apiUrl}/generate-ppt`, slidesJson);
  }


  downloadPpt(pptId: string, filename: string): void {
    const url = `http://127.0.0.1:8000/download/${pptId}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
}
