import { Component } from '@angular/core';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Nft } from '../../models/nft';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html'
})
export class ListingComponent {
  nft: Array<Nft>;
  customerLowestBalance: Customer = <Customer>{};
  customerHighestBalance: Customer = <Customer>{};

  constructor(private customerService: CustomerService) {
    this.nft = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {
    this.customerService.getCustomerWithHighestBalance().subscribe((data) => {
      this.customerHighestBalance = data;
      // console.log('getCustomerWithHighestBalance');
      // console.log(data);
    });

    this.customerService.getCustomerWithLowestBalance().subscribe((data) => {
      this.customerLowestBalance = data;
      // console.log('getCustomerWithLowestBalance');
      // console.log(data);
    });
  }

}
