import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from 'src/app/core/models/customer.model';
import { Nft } from '../../../models/nft';

@Component({
  selector: '[nft-single-card]',
  templateUrl: './nft-single-card.component.html',
})
export class NftSingleCardComponent implements OnInit {
  @Input() nft: Nft = <Nft>{};
  @Input() customer : Customer = <Customer>{};
  total = 0;
  constructor() {
  }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes["customer"] && changes["customer"].currentValue) {
      this.total = this.customer.accounts.reduce((acc, cur) => acc + cur.balance, 0);
      console.log(this.total);
    }

  }
}
