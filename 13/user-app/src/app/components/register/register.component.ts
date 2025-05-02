import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.user);
    this.router.navigate(['/login']);
  }
}