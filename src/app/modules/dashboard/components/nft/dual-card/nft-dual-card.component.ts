import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Nft } from '../../../models/nft';

@Component({
  selector: '[nft-dual-card]',
  templateUrl: './nft-dual-card.component.html',
})
export class NftDualCardComponent implements OnInit {
  @Input() nft: Nft = <Nft>{};
  totalCustomers: number = 0;
  totalBalance: number = 0;


  constructor(private customerService : CustomerService) {}

  ngOnInit(): void {
    // this.customerService.getCustomers().subscribe((data) => {
    //   this.totalCustomers = data.length;
    //   this.totalBalance = data.reduce((a, b) => a + b.balance, 0);
    // });

    this.customerService.getTotalBalance().subscribe((data) => {
        this.totalBalance = data;
      }
    );

    this.customerService.getTotalCustomers().subscribe((data) => {
        this.totalCustomers = data;
      }
    );

  }
}
