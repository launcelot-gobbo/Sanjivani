import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private key = 'user';

  register(user: any) {
    localStorage.setItem(this.key, JSON.stringify(user));
  }

  login(email: string, password: string): boolean {
    const saved = JSON.parse(localStorage.getItem(this.key) || '{}');
    return saved?.email === email && saved?.password === password;
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.key) || 'null');
  }
}