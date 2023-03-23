import { Component, OnInit } from '@angular/core';
import { Nft } from '../../models/nft';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nft',
  templateUrl: './add.component.html',
})
export class AddComponent {
  customerForm: FormGroup;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private router: Router) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      image: [''],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^([+]\d{1,2})?\d{10}$/)],
        [this.checkPhoneNumberExists.bind(this)],
      ],
      accounts: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {}

  createAccount(): FormGroup {
    return this.formBuilder.group({
      accountNumber: [this.generateAccountNumber()],
      type: ['', Validators.required],
      balance: ['', [Validators.required, Validators.min(200)]],
    });
  }
  addAccount(): void {
    this.accounts.push(this.createAccount());
  }

  removeAccount(index: number): void {
    if (this.accounts.length > 1) {
      this.accounts.removeAt(index);
    } else {
      alert('You must have at least one account');
    }
  }

  generateAccountNumber(): string {
    let number = '';
    const possible = '0123456789';

    for (let i = 0; i < 16; i++) {
      number += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.customerService.accountNumberExists(number).subscribe((exists) => {
      if (exists) {
        number = this.generateAccountNumber();
      }
    });

    return number;
  }

  get accounts(): FormArray {
    return this.customerForm.get('accounts') as FormArray;
  }

  generateRandomImageUrl(): string {
    const id = Math.floor(Math.random() * 100) + 1;
    const url = `https://randomuser.me/api/portraits/men/${id}.jpg`;
    return url;
  }

  submitForm() {
    if (this.customerForm.get('gender')?.value === 'male') {
      // this.customerForm.get('image')?.setValue("https://i.pravatar.cc/150?img=1")
      this.customerForm.get('image')?.setValue( this.generateRandomImageUrl());
    } else if (this.customerForm.get('gender')?.value === 'female') {
      // this.customerForm.get('image')?.setValue("https://i.pravatar.cc/150?img=2")
      this.customerForm.get('image')?.setValue('https://xsgames.co/randomusers/avatar.php?g=female');
    }
    this.customerService.createCustomer(this.customerForm.value).subscribe((customer) => {
      this.router.navigate(['/']);
    });
  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canAddAccount(): boolean {
    return this.accounts.length < 3 && this.accounts.valid;
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }

  getAccountBalanceControl(index: number) {
    return this.accounts.at(index).get('balance');
  }

  getAccountTypeControl(index: number) {
    return this.accounts.at(index).get('type');
  }
  checkPhoneNumberExists(control: AbstractControl): Observable<ValidationErrors | null> {
    const phoneNumber = control.value;
    if (!phoneNumber) {
      return of(null);
    }
    return this.customerService.getCustomerByPhoneNumber(phoneNumber).pipe(
      map((exists) => (exists ? { phoneNumberExists: true } : null)),
      catchError(() => of(null)),
    );
  }
}
