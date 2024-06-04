import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken: string | null = null;

  constructor() {}

  setToken(token: string) {
    this.authToken = token;
  }

  getToken(): string | null {
    return this.authToken;
  }
}
