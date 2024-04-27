import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private readonly apiUrl: string = `${environment.apiAddress}/ProfilePicture`;
  constructor(private http: HttpClient) { }
  addAvatarPicture(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    return this.http.post<any>(`${this.apiUrl}`, formData);
  }
}
