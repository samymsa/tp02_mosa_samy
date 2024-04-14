import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { passwordMatchValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'accounts-register',
  templateUrl: './accounts-register.component.html',
  providers: [ApiService],
})
export class AccountsRegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {}

  registerForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: passwordMatchValidator,
    },
  );

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.apiService.register(this.registerForm.value).subscribe((response) => {
      console.log('Register response: ', response);
      this.registerForm.reset();
    });
  }
}
