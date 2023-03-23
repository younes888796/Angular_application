import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss']
})
export class DetailCustomerComponent {
  customer?: Customer;
  customerForm: FormGroup;
  total = 0;

  constructor( private customerService: CustomerService, private formBuilder: FormBuilder, private router:Router,private activeRoute:ActivatedRoute) {
   this.customerForm = this.formBuilder.group({
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
    
  }

}
