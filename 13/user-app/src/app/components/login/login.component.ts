import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (this.userService.login(this.email, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.error = true;
    }
  }
}