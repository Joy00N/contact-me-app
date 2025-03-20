import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../model/user';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  user: User | null = null;
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.settingsForm = this.fb.group({
      emailNotifications: [true],
      pushNotifications: [true],
      notificationFrequency: ['daily'],
      language: ['en'],
      timezone: ['UTC'],
      theme: ['light']
    });
  }

  ngOnInit(): void {
    this.loadUserSettings();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUserSettings(): void {
    this.loading = true;
    this.error = null;

    this.accountService.user
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.user = user;
          if (user?.settings) {
            this.settingsForm.patchValue(user.settings);
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      const settings = this.settingsForm.value;
      
      this.accountService.updateUserSettings(settings)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.successMessage = 'Settings updated successfully';
            this.loading = false;
          },
          error: (error) => {
            this.error = error.message;
            this.loading = false;
          }
        });
    }
  }

  resetForm(): void {
    this.settingsForm.reset();
    this.loadUserSettings();
  }
} 