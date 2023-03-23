import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent {
  customer?: Customer;
  customerForm: FormGroup;
  total = 0;

  constructor( private customerService: CustomerService, private formBuilder: FormBuilder, private router:Router,private activeRoute:ActivatedRoute) {
   this.customerForm = this.formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      gender: [''],
      address: [''],
      phoneNumber: [''],
      image: [''],
      accounts: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.activeRoute.params
    .pipe(switchMap((params) => this.customerService.getCustomerById(params['id'])))
    .subscribe({
      next: (customer) => (
        this.customerForm.patchValue(customer),
        this.customer = customer,
        this.total = customer.accounts.reduce((acc, cur) => acc + cur.balance, 0)
        ),
      error: () => {
        this.router.navigate(['/not-found']);
      },
    });
  }

  updateCustomer() {
    // this.customerService.updateCustomer(this.customer?.id,this.customerForm.value).subscribe(() => {
    //   this.router.navigate(['/customers']);
    // });
  }

  updateCustomerPersonalInfo() {
    let updateCustomer = this.customerForm.value;
    updateCustomer.accounts = this.customer?.accounts;
    this.customerService.updateCustomer(updateCustomer).subscribe(() => {
      this.router.navigate(['/']);
      // console.log('Customer updated successfully');
    });
  }

  updateCustomerAccounts() {
    let updateCustomer = this.customerForm.value;
    updateCustomer.accounts = this.customer?.accounts;
    this.customerService.updateCustomer(updateCustomer).subscribe(() => {
      this.router.navigate(['/']);
      // console.log('Customer updated successfully');
    });
  }

  AddNewAccount() {
    this.customer?.accounts.push({accountNumber: this.generateAccountNumber(), balance: 0, type: 'savings'});
    // this.total = this.customer?.accounts.reduce((acc, cur) => acc + cur.balance, 0);
    this.total = this.customer?.accounts.reduce((acc, cur) => {
      if (cur.balance !== undefined) {
        return acc + cur.balance;
      } else {
        return acc;
      }
    }, 0) as number;
    
  }

  generateAccountNumber(): any {
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

  deleteAccount(accountNumber: string) {
    if (this.customer != null) {
      this.customer.accounts = this.customer?.accounts.filter((account) => account.accountNumber !== accountNumber);
      this.total = this.customer?.accounts.reduce((acc, cur) => acc + cur.balance, 0) as number;
    }
  }




}
