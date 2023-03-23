import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Nft } from '../../../models/nft';

@Component({
  selector: '[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() customer = <Customer>{};
  @Output() deleteCustomerEvent = new EventEmitter();


  constructor(private customerService:CustomerService,private router:Router) {}

  ngOnInit(): void {}

  deleteCustomer(id: any) {
    this.deleteCustomerEvent.emit(id);
  }
}
