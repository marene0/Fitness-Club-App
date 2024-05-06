import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly token = 'token';
  private readonly refreshToken = 'refreshToken';
  clear(): void {
    localStorage.clear();
  }
  setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshToken, refreshToken);
  }
  getToken(): string | null {
    return localStorage.getItem(this.token);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshToken);
  }
}
