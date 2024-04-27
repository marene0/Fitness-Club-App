import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly token = 'token';
  private readonly refreshToken = 'refreshToken';
  public clear(): void {
    localStorage.clear();
  }
  public setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }
  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshToken, refreshToken);
  }
  public getToken(): string | null {
    return localStorage.getItem(this.token);
  }
  public getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshToken);
  }
}
