import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ResetPasswordData } from '../api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    // Reset message
    this.message = '';

    // Validate passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match';
      this.isError = true;
      return;
    }

    // Validate password is not empty
    if (!this.username || !this.newPassword) {
      this.message = 'Username and password are required';
      this.isError = true;
      return;
    }

    // Validate password length
    if (this.newPassword.length < 6) {
      this.message = 'Password must be at least 6 characters long';
      this.isError = true;
      return;
    }

    const resetData: ResetPasswordData = {
      username: this.username,
      newPassword: this.newPassword
    };

    this.isLoading = true;

    this.apiService.resetPassword(resetData).subscribe(
      (response: any) => {
        console.log('Password reset successful:', response);
        this.message = 'Password reset successful. Redirecting to login...';
        this.isError = false;
        this.isLoading = false;

        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error: any) => {
        console.error('Password reset failed:', error);
        this.isLoading = false;

        if (error.status === 404) {
          this.message = 'User not found. Please check your username.';
        } else {
          this.message = error.error || 'Password reset failed. Please try again.';
        }

        this.isError = true;
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
